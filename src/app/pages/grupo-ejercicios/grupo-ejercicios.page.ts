import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { Usuario } from 'src/interfaces/interfaces';
import { AddGrupoEjerciciosPage } from './add-grupo-ejercicios/add-grupo-ejercicios.page';
import { UsuarioService } from '../../services/usuario.service';
import { GrupoEjerciciosService } from 'src/app/services/grupo-ejercicios.service';
import { GrupoEjercicios } from '../../../interfaces/interfaces';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { ProfesorService } from '../../services/profesor.service';

@Component({
  selector: 'app-grupo-ejercicios',
  templateUrl: './grupo-ejercicios.page.html',
  styleUrls: ['./grupo-ejercicios.page.scss'],
})
export class GrupoEjerciciosPage implements OnInit {

  usuario: Usuario={};
  cargando:boolean;
  grupoEjercicios: GrupoEjercicios[]=[]
  terminoBusqueda: string = '';
  eliminados:GrupoEjercicios[]=[]
  colorTarjeta="white";
  seleccionaEliminar=false;
  activateAnimation=false;


  constructor( private navCtrl:NavController,
    private modalController:ModalController,
    private usuarioService:UsuarioService,
    private grupoEjerciciosService:GrupoEjerciciosService,
    private uiService: UiServiceService,
    private alertController: AlertController,
    private profesorService: ProfesorService) { }

   async ngOnInit() {
    this.cargando=true;
    this.eliminados= [];
    const profesorId = await this.profesorService.getProfesorIdActual()
    if (profesorId !== null){
     this.usuario = await this.usuarioService.getUsuarioId(profesorId)
    } else {
      this.usuario = this.usuarioService.getUsuario();
    }
    await this.grupoEjerciciosService.getGruposUsuario(this.usuario.id).then((grupoEjercicios:GrupoEjercicios[])=>{
      this.grupoEjercicios = grupoEjercicios
    })
    
    this.cargando=false;
  }

  async ionViewDidEnter(){
this.ngOnInit()
  }
  

  goToEjercicios(grupoEjercicioId:string){
    this.grupoEjerciciosService.setGrupoEjerciciosIdActual(grupoEjercicioId);
    this.navCtrl.navigateRoot( 'main/tabs/ejercicios', { animated:true})
  }

  
async mostrarAddGrupoEjercicios(){
  if (!this.seleccionaEliminar){
    const modal = await this.modalController.create({
      component: AddGrupoEjerciciosPage,
      componentProps: { usuario: this.usuario},
    });
    modal.onDidDismiss()
    .then(() => {
    this.ngOnInit()
   });
    return await modal.present()
  } else {
    const modal = await this.modalController.create({
      component: AddGrupoEjerciciosPage,
      componentProps: { usuario: this.usuario, grupoEjercicios:this.eliminados[0]},
    });
    modal.onDidDismiss()
    .then(() => {
    this.ngOnInit()
   });
    return await modal.present()

  }

 }

 onPress($event, grupoEjercicios:GrupoEjercicios) {
  this.seleccionaEliminar=true;
  grupoEjercicios.animaTarjeta = true
  if (grupoEjercicios.colorTarjeta === undefined || grupoEjercicios.colorTarjeta==='white') {
    grupoEjercicios.colorTarjeta= "#e6e7be85";
    this.eliminados.push(grupoEjercicios);
  }
  else {
    grupoEjercicios.colorTarjeta= "white";
    this.sacadeEliminados(grupoEjercicios)
    if (this.eliminados.length===0){
      this.seleccionaEliminar=false;
    }
  }

}

onPressUp($event, grupoEjercicios:GrupoEjercicios) {
if (this.eliminados.length===0){
  this.seleccionaEliminar=false;
}
grupoEjercicios.animaTarjeta=false;
}

sacadeEliminados(grupoEjercicios:GrupoEjercicios){
this.eliminados.forEach((value,index)=>{
  if(value==grupoEjercicios) this.eliminados.splice(index,1);
});
}

clickTarjeta(grupoEjercicios:GrupoEjercicios){
if (this.seleccionaEliminar){

  if (grupoEjercicios.colorTarjeta === undefined || grupoEjercicios.colorTarjeta==='white') {
    grupoEjercicios.animaTarjeta = true
    grupoEjercicios.colorTarjeta= "#e6e7be85";
    this.eliminados.push(grupoEjercicios);
  }
  else {
    if (this.eliminados.length > 1){
      grupoEjercicios.animaTarjeta = true
    grupoEjercicios.colorTarjeta= "white";
    this.sacadeEliminados(grupoEjercicios)
    }
  }

} else {
  this.goToEjercicios(grupoEjercicios.id)
}
}

 
 async eliminarGrupo(){
  const alert = await this.alertController.create({
  
    header: 'Eliminar grupos de ejercicios',
    message: '¿Estás seguro? Se eliminarán los grupos seleccionados',
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
          for (let grupoEjercicios of this.eliminados){
           await this.grupoEjerciciosService.deleteGrupoEjercicios(grupoEjercicios);
            contador++;
          }
         
          if (contador=== this.eliminados.length){
            this.uiService.alertaInformativa('Los grupos han sido eliminadas');
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
