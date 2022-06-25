import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController, PopoverController } from '@ionic/angular';
import { Alumno, AlumnoUsuario, Usuario } from '../../../interfaces/interfaces';
import { ProfesorService } from '../../services/profesor.service';
import { UsuarioService } from '../../services/usuario.service';
import { AlumnoService } from '../../services/alumno.service';
import { AlumnoUsuarioService } from '../../services/alumno-usuario.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AddAlumnoPage } from './add-alumno/add-alumno.page';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {
  alumnos: Alumno[]=[];
  alumnosTotales: any;
  alumnosUsuario: Usuario[]=[];
  usuario: Usuario={};
  terminoBusqueda: string = '';
  nivel='';
  cargando:boolean=true;
  private backButtonSub: Subscription;
  eliminados:Alumno[]=[]
  seleccionaEliminar=false;
  activateAnimation=false;
  esClub:boolean = false;
 // type: SearchType = SearchType.all;

  constructor(private profesorService:ProfesorService, 
    private modalController:ModalController,
    private popoverController:PopoverController,
    private usuarioService:UsuarioService,
    private alumnoService: AlumnoService,
    private alumnoUsuarioService:AlumnoUsuarioService,
    private navCtrl:NavController,
    private alertController: AlertController,
    private uiService: UiServiceService,
    private platform: Platform) {
      this.platform.backButton.subscribeWithPriority(10, () => {
        this.uiService.alertaInformativa('Boton fisico');
      });
     }

  async ngOnInit() {

  }

  searchChanged(event){
    this.alumnos = this.alumnosTotales.filter(item => event.detail.value === '' || item.nivel === +event.detail.value);
    
  }

  goToAnterior(){
    this.navCtrl.back();
  }
  
  async ionViewDidEnter(){
    this.backButtonSub = this.platform.backButton.subscribeWithPriority(
      10000,
      () => this.goToAnterior()
    );
   await this.getDatos();
 }
 
 ionViewWillLeave() {
  this.backButtonSub.unsubscribe();
}
 async getDatos(){
  this.cargando = true;
  this.alumnosUsuario=[]
  this.alumnos=[];
  this.eliminados= [];
  this.seleccionaEliminar=false;
  const profesorId = await this.profesorService.getProfesorIdActual()
    if (profesorId !== null){
     this.usuario = await this.usuarioService.getUsuarioId(profesorId)
    } else {
      this.usuario = this.usuarioService.getUsuario();
    }
    if (this.usuario.tipo === 3){
      this.esClub = true;
    }
    console.log(this.usuario)
  await this.profesorService.getAlumnosProfesor(this.usuario.id).then(async (alumnos:Alumno[])=>{
    console.log("HOLAAAAA")
    this.alumnos = alumnos
    console.log(alumnos)
    for (let alumno of alumnos){
      await this.alumnoService.getAvatar(alumno.profesorId,alumno.avatar).then(async (avatarBlob:Blob)=>{
    
        await this.createImageFromBlob(alumno,avatarBlob)
        
        
      })
    }
  });
  if (this.esClub){
    console.log("es club")
    await this.profesorService.getProfesoresClub(this.usuario.id).then(async (profesoresIdObject:any)=>{
    
      for (let profesor of profesoresIdObject) {
        this.usuarioService.getUsuarioId(profesor.usuarioId).then(async (profesor:Usuario) =>{
         
          await this.profesorService.getAlumnosProfesor(profesor.id).then(async (alumnos:Alumno[])=>{ 
            for (let alumno of alumnos){
              await this.alumnoService.getAvatar(alumno.profesorId,alumno.avatar).then(async (avatarBlob:Blob)=>{
            
                await this.createImageFromBlob(alumno,avatarBlob)
                this.alumnos.push(alumno)
              })
            }
          })
        
          
        })  
  }
})
}

 /* 
  await this.profesorService.getAlumnosUsuarioProfesor(this.usuario.id).then((alumnos:AlumnoUsuario[])=>{
    alumnos.forEach(async alumno => {
       await this.usuarioService.getUsuarioId(alumno.usuarioId).then((usuario:Usuario)=>{      
         this.alumnosUsuario.push(usuario)
       });
    });
  });*/
  await this.sleep(500)
  this.cargando=false;
 }

 sleep(ms = 0) {
  return new Promise((r) => setTimeout(r, ms));
}

 async createImageFromBlob(alumno,image: Blob) {
  let FileReader: new() => FileReader = ((window as any).FileReader as any).__zone_symbol__OriginalDelegate;
  let reader = new FileReader();

  reader.onload = () =>{
     alumno.foto = reader.result;
  };
  if (image) {
     reader.readAsDataURL(image);
  }
}

  goToAlumno(alumnoId:string){
    this.alumnoService.setPaginaAnterior('alumnos')
    this.alumnoService.setAlumnoIdActual(alumnoId);
    this.navCtrl.navigateRoot( 'main/tabs/alumno', { animated:true})
  }

  
  onPress($event, alumno:Alumno) {
    this.seleccionaEliminar=true;
    alumno.animaTarjeta = true
    if (alumno.colorTarjeta === undefined || alumno.colorTarjeta==='white') {
      alumno.colorTarjeta= "#e6e7be85";
      this.eliminados.push(alumno);
    }
    else {
      alumno.colorTarjeta= "white";
      this.sacadeEliminados(alumno)
      if (this.eliminados.length===0){
        this.seleccionaEliminar=false;
      }
    }

}

async mostrarAddAlumno(){
  const modal = await this.modalController.create({
    component: AddAlumnoPage,
  });
  await this.popoverController.dismiss();
  return await modal.present();
}


onPressUp($event, alumno:Alumno) {
  if (this.eliminados.length===0){
    this.seleccionaEliminar=false;
  }
  alumno.animaTarjeta=false;
}

sacadeEliminados(alumno:Alumno){
  this.eliminados.forEach((value,index)=>{
    if(value==alumno) this.eliminados.splice(index,1);
});
}
  
clickTarjeta(alumno:Alumno){
  if (this.seleccionaEliminar){
   
    alumno.animaTarjeta=false;
    if (alumno.colorTarjeta === undefined || alumno.colorTarjeta==='white') {
      alumno.animaTarjeta = true
      alumno.colorTarjeta= "#e6e7be85";
      this.eliminados.push(alumno);
    }
    else {
      if (this.eliminados.length > 1){
        alumno.animaTarjeta = true
      alumno.colorTarjeta= "white";
      this.sacadeEliminados(alumno)
      }
    }


  } else {
    this.goToAlumno(alumno.id)
  }
}


  async eliminarAlumno(){
    const alert = await this.alertController.create({
    
      header: 'Eliminar alumno',
      message: '¿Estás seguro? Se eliminará al alumno',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
     
          handler: (blah) => {
           
          }
        }, {
          text: 'Eliminar',
          handler: async () => {
            let contador = 0;
          for (let alumno of this.eliminados){
           await this.alumnoService.deleteAlumno(alumno);
            contador++;
          }
         
          if (contador=== this.eliminados.length){
            this.uiService.alertaInformativa('Los alumnos han sido eliminados');
            this.ngOnInit()
 
            
          } else {
            this.uiService.alertaInformativa('Error al eliminar')
            
          }
          }
        }
      ]
    });
  
    await alert.present();
  
  
  
  }


}
