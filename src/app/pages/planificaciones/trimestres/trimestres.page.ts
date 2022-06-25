import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { IonContent, NavController } from '@ionic/angular';
import { Alumno, DetalleTecnico, Usuario } from 'src/interfaces/interfaces';
import { AlumnoService } from '../../../services/alumno.service';
import { UsuarioService } from '../../../services/usuario.service';
import { DetalleTecnicoService } from '../../../services/detalle-tecnico.service';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';

import { UiServiceService } from 'src/app/services/ui-service.service';
import { ComiteTecnicoService } from '../../../services/comite-tecnico.service';
import { PopoverDetalleTecnicoComponent } from '../../../components/popover-detalle-tecnico/popover-detalle-tecnico.component';
import { Planificacion, Trimestre } from '../../../../interfaces/interfaces';
import { TrimestreService } from 'src/app/services/trimestre.service';
import { PlanificacionesService } from 'src/app/services/planificaciones.service';
import { AddTrimestrePage } from './add-trimestre/add-trimestre.page';


@Component({
  selector: 'app-trimestres',
  templateUrl: './trimestres.page.html',
  styleUrls: ['./trimestres.page.scss'],
})
export class TrimestresPage implements OnInit {
  @ViewChild(IonContent, {read: ElementRef, static:true}) seleccionDetalle: ElementRef;
  @ViewChild("triggerElement", {read: ElementRef, static:true}) triggerElement: ElementRef;

  cargando:boolean;
  usuario: Usuario={};
  planificacion: Planificacion;
  planificacionId: string;
  trimestres: Trimestre[]=[]
  terminoBusqueda: string = '';
  observer: IntersectionObserver;
  eliminados:Trimestre[]=[]
  seleccionaEliminar=false;
  activateAnimation=false;

  constructor(
    private usuarioService:UsuarioService,
    private trimestreService:TrimestreService,
    private planificacionesService: PlanificacionesService,
    private modalController:ModalController,
    private uiService: UiServiceService,
    private alertController: AlertController,
    private popoverController: PopoverController,
    private renderer: Renderer2,
    private navCtrl:NavController,) { }

  async ngOnInit() {
    this.cargando=true;
    this.eliminados= [];
    this.seleccionaEliminar=false;
    this.usuario = this.usuarioService.getUsuario();
    await this.planificacionesService.getplanificacionIdActual().then(async planificacionId=>{
      this.planificacionId = planificacionId
      await this.planificacionesService.getPlanificacion(this.usuario.id,planificacionId).then(planificacion =>{
        this.planificacion = planificacion
        console.log(planificacion)
      })
    })
    
   await this.trimestreService.getTrimestresPlanificacion(this.planificacionId,this.usuario.id).then(
     (trimestres:Trimestre[])=>{
       console.log(trimestres)
      this.trimestres = trimestres
     }
   )

    this.observer = new IntersectionObserver((entries)=>{
      entries.forEach((entry:any)=>{
        if (entry.isIntersecting){
          this.renderer.addClass(this.seleccionDetalle.nativeElement, 'no-transform')
        }else {
          this.renderer.removeClass(this.seleccionDetalle.nativeElement, 'no-transform')
     
        }
      })
    })
    this.observer.observe(this.triggerElement.nativeElement);
    this.cargando=false;
 
    
  }

  async ionViewDidEnter(){
    await this.ngOnInit()
 }

 async mostrarAddTrimestre(trimestre?:Trimestre){
  const modal = await this.modalController.create({
    component: AddTrimestrePage,
    componentProps: { usuario: this.usuario , planificacionId:this.planificacionId, trimestre:this.eliminados[0]},
  });
  modal.onDidDismiss()
  .then(() => {
  this.ngOnInit()
});
  return await modal.present()
}


 
onPress($event, trimestre:Trimestre) {
  this.seleccionaEliminar=true;
  trimestre.animaTarjeta = true
  if (trimestre.colorTarjeta === undefined || trimestre.colorTarjeta==='white') {
    trimestre.colorTarjeta= "#e6e7be85";
    this.eliminados.push(trimestre);
  }
  else {
    trimestre.colorTarjeta= "white";
    this.sacadeEliminados(trimestre)
    if (this.eliminados.length===0){
      this.seleccionaEliminar=false;
    }
  }

}

onPressUp($event, trimestre:Trimestre) {
if (this.eliminados.length===0){
  this.seleccionaEliminar=false;
}
trimestre.animaTarjeta=false;
}

sacadeEliminados(trimestre:Trimestre){
this.eliminados.forEach((value,index)=>{
  if(value==trimestre) this.eliminados.splice(index,1);
});
}

clickTarjeta(trimestre:Trimestre){
if (this.seleccionaEliminar){
 
  trimestre.animaTarjeta=false;
  if (trimestre.colorTarjeta === undefined || trimestre.colorTarjeta==='white') {
    trimestre.animaTarjeta = true
    trimestre.colorTarjeta= "#e6e7be85";
    this.eliminados.push(trimestre);
  }
  else {
    if (this.eliminados.length > 1){
      trimestre.animaTarjeta = true
      trimestre.colorTarjeta= "white";
    this.sacadeEliminados(trimestre)
    }
  }


} else {
  this.goToSemanas(trimestre.id)
}
}


goToSemanas(trimestreId:string){
  this.trimestreService.setTrimestreIdActual(trimestreId);
  this.navCtrl.navigateRoot( 'main/tabs/semanas', { animated:true})
}



async eliminarTrimestre(){
  const alert = await this.alertController.create({
  
    header: 'Eliminar trimestres',
    message: '¿Estás seguro? Se eliminarán los trimestres seleccionados',
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
          for (let triemstre of this.eliminados){
           await this.trimestreService.deleteTrimestre(triemstre);
            contador++;
          }
         
          if (contador=== this.eliminados.length){
            this.uiService.alertaInformativa('Los trimestres han sido eliminados');
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
