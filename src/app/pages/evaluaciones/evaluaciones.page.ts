import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AlumnoService } from 'src/app/services/alumno.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Alumno, ComiteTecnico, Usuario } from 'src/interfaces/interfaces';
import { ComiteTecnicoService } from '../../services/comite-tecnico.service';
import { AddComiteTecnicoPage } from '../comite-tecnico/add-comite-tecnico/add-comite-tecnico.page';

@Component({
  selector: 'app-evaluaciones',
  templateUrl: './evaluaciones.page.html',
  styleUrls: ['./evaluaciones.page.scss'],
})
export class EvaluacionesPage implements OnInit {
  cargando:boolean;
  alumnoId:string
  usuario: Usuario={};
  alumno: Alumno;
  comites: ComiteTecnico[]=[]
  terminoBusqueda: string = '';
  eliminados:ComiteTecnico[]=[]
  seleccionaEliminar=false;
  activateAnimation=false;
  constructor(private alumnoService: AlumnoService,
    private usuarioService:UsuarioService,
    private comiteTecnicoService:ComiteTecnicoService,
    private modalController:ModalController,
    private uiService: UiServiceService,
    private alertController: AlertController,
    private navCtrl:NavController) { }

  async ngOnInit() {
    this.cargando=true;
    this.eliminados= [];
    this.seleccionaEliminar=false;
    this.usuario = this.usuarioService.getUsuario();
    await this.alumnoService.getAlumnoIdActual().then(alumnoId=>{
      this.alumnoId = alumnoId
    })
    await this.alumnoService.getAlumno(this.alumnoId).then(alumno=>{
      this.alumno=alumno[0];
    });
    await this.comiteTecnicoService.getComitesTecnicosAlumno(this.alumnoId,this.usuario.id).then((comites:ComiteTecnico[])=>{
      this.comites=comites
    })
    this.cargando=false;
    
  }

  async ionViewDidEnter(){
    await this.ngOnInit()
 }

 
 async mostrarAddComite(){
  const modal = await this.modalController.create({
    component: AddComiteTecnicoPage,
    componentProps: { usuario: this.usuario , alumnoId:this.alumnoId},
  });
  modal.onDidDismiss()
  .then(() => {
  this.ngOnInit()
});
  return await modal.present()
}

goToComite(comiteId:string){
  this.comiteTecnicoService.setComiteIdActual(comiteId);
  this.navCtrl.navigateRoot( 'main/tabs/comite-tecnico', { animated:true})
}


onPress($event, comite:ComiteTecnico) {
  this.seleccionaEliminar=true;
  comite.animaTarjeta = true
  if (comite.colorTarjeta === undefined || comite.colorTarjeta==='white') {
    comite.colorTarjeta= "#e6e7be85";
    this.eliminados.push(comite);
  }
  else {
    comite.colorTarjeta= "white";
    this.sacadeEliminados(comite)
    if (this.eliminados.length===0){
      this.seleccionaEliminar=false;
    }
  }

}

onPressUp($event, comite:ComiteTecnico) {
if (this.eliminados.length===0){
  this.seleccionaEliminar=false;
}
comite.animaTarjeta=false;
}

sacadeEliminados(comite:ComiteTecnico){
this.eliminados.forEach((value,index)=>{
  if(value==comite) this.eliminados.splice(index,1);
});
}

clickTarjeta(comite:ComiteTecnico){
if (this.seleccionaEliminar){
 
  comite.animaTarjeta=false;
  if (comite.colorTarjeta === undefined || comite.colorTarjeta==='white') {
    comite.animaTarjeta = true
    comite.colorTarjeta= "#e6e7be85";
    this.eliminados.push(comite);
  }
  else {
    if (this.eliminados.length > 1){
      comite.animaTarjeta = true
      comite.colorTarjeta= "white";
    this.sacadeEliminados(comite)
    }
  }


} else {
  this.goToComite(comite.id)
}
}


async eliminarComite(){
  const alert = await this.alertController.create({
  
    header: 'Eliminar comités',
    message: '¿Estás seguro? Se eliminarán los comités técnicos seleccionados',
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
          for (let comite of this.eliminados){
           await this.comiteTecnicoService.deleteComiteTecnico(comite);
            contador++;
          }
         
          if (contador=== this.eliminados.length){
            this.uiService.alertaInformativa('Los comités han sido eliminados');
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

async enviaPdf(){
  let contador = 0;
  for (let comite of this.eliminados){
   await this.comiteTecnicoService.enviaComite(comite.id,this.usuario.id,this.alumnoId);
    contador++;
  }
 
  if (contador=== this.eliminados.length){
    this.uiService.alertaInformativa('Los comités han sido enviados');
    this.ngOnInit()

    
  } else {
    this.uiService.alertaInformativa('Error al enviar')
    
  }

}

}
