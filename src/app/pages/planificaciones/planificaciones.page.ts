import { Component, OnInit, ViewChild, ViewChildren, ElementRef, Query, QueryList } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { PlanificacionesService } from 'src/app/services/planificaciones.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/interfaces/interfaces';
import { Planificacion } from '../../../interfaces/interfaces';
import { AddPlanificacionPage } from './add-planificacion/add-planificacion.page';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ProfesorService } from '../../services/profesor.service';



@Component({
  selector: 'app-planificaciones',
  templateUrl: './planificaciones.page.html',
  styleUrls: ['./planificaciones.page.scss'],
})
export class PlanificacionesPage implements OnInit {

  usuario: Usuario={};
  cargando:boolean;
  planificaciones: Planificacion[]=[]
  terminoBusqueda: string = '';
  dragTiempo = 10000
  eliminados:Planificacion[]=[]
  seleccionaEliminar=false;
  activateAnimation=false;




  constructor( private navCtrl:NavController,
    private modalController:ModalController,
    private usuarioService:UsuarioService,
    private planificacionService:PlanificacionesService,
    private uiService: UiServiceService,
    private alertController: AlertController,
    private profesorService: ProfesorService) { }

   async ngOnInit() {
    this.cargando=true;
    this.planificaciones=[];
    this.eliminados= [];
    this.seleccionaEliminar=false; const profesorId = await this.profesorService.getProfesorIdActual()
    if (profesorId !== null){
     this.usuario = await this.usuarioService.getUsuarioId(profesorId)
    } else {
      this.usuario = this.usuarioService.getUsuario();
    }
    await this.planificacionService.getPlanificacionesUsuario(this.usuario.id).then((planificaciones:Planificacion[])=>{
      this.planificaciones = planificaciones
    })
    let profeClub:any = await this.profesorService.getClubProfesor(this.usuario.id)
    if (profeClub !== null){
      await this.planificacionService.getPlanificacionesUsuario(profeClub.clubId).then((planificaciones:Planificacion[])=>{
        for (let planificacion of planificaciones){
        this.planificaciones.push(planificacion)
        }
      })
    }
    
    this.cargando=false;
  }

  async ionViewDidEnter(){
this.ngOnInit()
  }


 
  onPress($event, planificacion:Planificacion) {
    this.seleccionaEliminar=true;
    planificacion.animaTarjeta = true
    if (planificacion.colorTarjeta === undefined || planificacion.colorTarjeta==='white') {
      planificacion.colorTarjeta= "#e6e7be85";
      this.eliminados.push(planificacion);
    }
    else {
      planificacion.colorTarjeta= "white";
      this.sacadeEliminados(planificacion)
      if (this.eliminados.length===0){
        this.seleccionaEliminar=false;
      }
    }

}

onPressUp($event, planificacion:Planificacion) {
  console.log(this.eliminados)
  if (this.eliminados.length===0){
    this.seleccionaEliminar=false;
  }
  planificacion.animaTarjeta=false;
}

sacadeEliminados(planificacion:Planificacion){
  this.eliminados.forEach((value,index)=>{
    if(value==planificacion) this.eliminados.splice(index,1);
});
}
  
clickTarjeta(planificacion:Planificacion){
  if (this.seleccionaEliminar){
   
    planificacion.animaTarjeta=false;
    if (planificacion.colorTarjeta === undefined || planificacion.colorTarjeta==='white') {
      planificacion.animaTarjeta = true
      planificacion.colorTarjeta= "#e6e7be85";
      this.eliminados.push(planificacion);
    }
    else {
      if (this.eliminados.length > 1){
        planificacion.animaTarjeta = true
      planificacion.colorTarjeta= "white";
      this.sacadeEliminados(planificacion)
      }
    }


  } else {
    this.goToPlanificacion(planificacion.id)
  }
}


  goToPlanificacion(planificacionId:string){
    if (this.seleccionaEliminar === false){
    this.planificacionService.setPlanificacionIdActual(planificacionId);
    this.navCtrl.navigateRoot( 'main/tabs/trimestres', { animated:true})
    }
  }

  sleep(ms = 0) {
    return new Promise((r) => setTimeout(r, ms));
  }

  
async mostrarAddPlanificacion(){
  const modal = await this.modalController.create({
    component: AddPlanificacionPage,
    componentProps: { usuario: this.usuario, planificacion:this.eliminados[0]},
  });
  modal.onDidDismiss()
  .then(() => {
  this.ngOnInit()
 });
  return await modal.present()
 }

 
 async eliminarPlanificaciones(){
  const alert = await this.alertController.create({
  
    header: 'Eliminar planificaciones',
    message: '¿Estás seguro? Se eliminarán las planificaciones seleccionadas',
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
          for (let planificacion of this.eliminados){
           await this.planificacionService.deletePlanificacion(planificacion);
            contador++;
          }
         
          if (contador=== this.eliminados.length){
            this.uiService.alertaInformativa('Las planificaciones han sido eliminadas');
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
