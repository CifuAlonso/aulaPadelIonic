import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AlertController, IonContent, ModalController, NavController, PopoverController } from '@ionic/angular';
import { PlanificacionesService } from 'src/app/services/planificaciones.service';
import { TrimestreService } from 'src/app/services/trimestre.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Planificacion, Semana, Trimestre, Usuario } from 'src/interfaces/interfaces';
import { SemanaService } from '../../../../services/semana.service';
import { AddSemanaPage } from './add-semana/add-semana.page';

@Component({
  selector: 'app-semanas',
  templateUrl: './semanas.page.html',
  styleUrls: ['./semanas.page.scss'],
})
export class SemanasPage implements OnInit {

  @ViewChild(IonContent, {read: ElementRef, static:true}) seleccionDetalle: ElementRef;
  @ViewChild("triggerElement", {read: ElementRef, static:true}) triggerElement: ElementRef;

  cargando:boolean;
  usuario: Usuario={};
  planificacion: Planificacion;
  planificacionId: string;
  trimestre: Trimestre;
  trimestreId:string;
  semanas: Semana[]=[]
  terminoBusqueda: string = '';
  observer: IntersectionObserver;
  eliminados:Semana[]=[]
  seleccionaEliminar=false;
  activateAnimation=false;

  constructor(
    private usuarioService:UsuarioService,
    private trimestreService:TrimestreService,
    private planificacionesService: PlanificacionesService,
    private semanaService:SemanaService,
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
      })
    })
    await this.trimestreService.getTrimestreIdActual().then(async trimestreId=>{
      this.trimestreId = trimestreId
      await this.trimestreService.getTrimestre(this.trimestreId).then(trimestre =>{
        this.trimestre = trimestre
      })
    })

   await this.semanaService.getSemanasTrimestre(this.trimestreId,this.usuario.id).then(
     (semanas:Semana[])=>{
      this.semanas = semanas
     }
   )
   console.log(this.semanas)

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



 async mostrarAddSemana(semana?:Semana){
  const modal = await this.modalController.create({
    component: AddSemanaPage,
    componentProps: { usuario: this.usuario , planificacionId:this.planificacionId, trimestreId:this.trimestreId, semana},
  });
  modal.onDidDismiss()
  .then(() => {
  this.ngOnInit()
});
  return await modal.present()
}


goToSemana(semanaId:string){
  this.semanaService.setSemanaIdActual(semanaId);
  this.semanaService.setPaginaAnterior('semanas')
  this.navCtrl.navigateRoot( 'main/tabs/semana', { animated:true})
}

 
onPress($event, semana:Semana) {
  this.seleccionaEliminar=true;
  semana.animaTarjeta = true
  if (semana.colorTarjeta === undefined || semana.colorTarjeta==='white') {
    semana.colorTarjeta= "#e6e7be85";
    this.eliminados.push(semana);
  }
  else {
    semana.colorTarjeta= "white";
    this.sacadeEliminados(semana)
    if (this.eliminados.length===0){
      this.seleccionaEliminar=false;
    }
  }

}

onPressUp($event, semana:Semana) {
console.log(this.eliminados)
if (this.eliminados.length===0){
  this.seleccionaEliminar=false;
}
semana.animaTarjeta=false;
}

sacadeEliminados(semana:Semana){
this.eliminados.forEach((value,index)=>{
  if(value==semana) this.eliminados.splice(index,1);
});
}

clickTarjeta(semana:Semana){
if (this.seleccionaEliminar){
 
  semana.animaTarjeta=false;
  if (semana.colorTarjeta === undefined || semana.colorTarjeta==='white') {
    semana.animaTarjeta = true
    semana.colorTarjeta= "#e6e7be85";
    this.eliminados.push(semana);
  }
  else {
    if (this.eliminados.length > 1){
      semana.animaTarjeta = true
      semana.colorTarjeta= "white";
    this.sacadeEliminados(semana)
    }
  }


} else {
  this.goToSemana(semana.id)
}
}




async eliminarSemana(){
  const alert = await this.alertController.create({
  
    header: 'Eliminar clases',
    message: '¿Estás seguro? Se eliminarán las clases seleccionadas',
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
          for (let semana of this.eliminados){
           await this.semanaService.deleteSemana(semana);
            contador++;
          }
         
          if (contador=== this.eliminados.length){
            this.uiService.alertaInformativa('Las clases han sido eliminadas');
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
