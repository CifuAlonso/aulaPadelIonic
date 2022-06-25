import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Alumno, AlumnoUsuario, Usuario } from '../../../interfaces/interfaces';
import { ProfesorService } from '../../services/profesor.service';
import { UsuarioService } from '../../services/usuario.service';
import { AlumnoService } from '../../services/alumno.service';
import { AlumnoUsuarioService } from '../../services/alumno-usuario.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.page.html',
  styleUrls: ['./profesores.page.scss'],
})
export class ProfesoresPage implements OnInit {
  profesores: Usuario[]=[];
  profesoresTotales: any;
  usuario: Usuario={};
  terminoBusqueda: string = '';
  nivel='';
  cargando:boolean=true;
  private backButtonSub: Subscription;
  eliminados:Usuario[]=[]
  seleccionaEliminar=false;
  activateAnimation=false;
 // type: SearchType = SearchType.all;

  constructor(private profesorService:ProfesorService, 
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
    this.profesores = this.profesoresTotales.filter(item => event.detail.value === '');
    
  }

  goToAnterior(){
    this.navCtrl.back();
  }
  
  async ionViewDidEnter(){
    this.profesores=[];
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
  this.profesores=[];
  this.eliminados= [];
  this.seleccionaEliminar=false;
  this.usuario = this.usuarioService.getUsuario();
  
  await this.profesorService.getProfesoresClub(this.usuario.id).then(async (profesoresIdObject:any)=>{
    
    for (let profesor of profesoresIdObject) {
      this.usuarioService.getUsuarioId(profesor.usuarioId).then(async (profesor:Usuario) =>{
        await this.usuarioService.getAvatar(profesor.avatar).then(async (avatarBlob:Blob)=>{
    
          await this.createImageFromBlob(profesor,avatarBlob)
          this.profesores.push(profesor)
        })
      
        
      })  
    };
    /*
    this.alumnos = alumnos 
    for (let alumno of this.alumnos){
      await this.alumnoService.getAvatar(alumno.profesorId,alumno.avatar).then(async (avatarBlob:Blob)=>{
    
        await this.createImageFromBlob(alumno,avatarBlob)
        
      })
    }
*/
  });

  await this.sleep(500)
  this.cargando=false;
 }

 sleep(ms = 0) {
  return new Promise((r) => setTimeout(r, ms));
}


 async createImageFromBlob(profesor,image: Blob) {
  let FileReader: new() => FileReader = ((window as any).FileReader as any).__zone_symbol__OriginalDelegate;
  let reader = new FileReader();

  reader.onload = () =>{
     profesor.avatar = reader.result;
  };
  if (image) {
     reader.readAsDataURL(image);
  }
}

  goToProfesor(profesorId:string){
   // this.alumnoService.setPaginaAnterior('alumnos')
    this.profesorService.setProfesorIdActual(profesorId);
    this.navCtrl.navigateRoot( 'main/tabs/profesor', { animated:true})
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
  
clickTarjeta(profesor:Usuario){
  if (this.seleccionaEliminar){
   
    profesor.animaTarjeta=false;
    if (profesor.colorTarjeta === undefined || profesor.colorTarjeta==='white') {
      profesor.animaTarjeta = true
      profesor.colorTarjeta= "#e6e7be85";
      this.eliminados.push(profesor);
    }
    else {
      if (this.eliminados.length > 1){
        profesor.animaTarjeta = true
        profesor.colorTarjeta= "white";
      this.sacadeEliminados(profesor)
      }
    }


  } else {
    this.goToProfesor(profesor.id)
  }
}


  async eliminarAlumno(){
    const alert = await this.alertController.create({
    
      header: 'Eliminar profesor',
      message: '¿Estás seguro? Se eliminará al profesor',
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
          for (let profesor of this.eliminados){
           await this.usuarioService.deleteUsuario(profesor);
         //  let profeClub = await this.profesorService.getClubProfesor(profesor.id)
          // console.log(profeClub)
         //  await this.profesorService.deleteProfesor(profeClub)
            contador++;
          }
         
          if (contador=== this.eliminados.length){
            this.uiService.alertaInformativa('Los profesores han sido eliminados');
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
