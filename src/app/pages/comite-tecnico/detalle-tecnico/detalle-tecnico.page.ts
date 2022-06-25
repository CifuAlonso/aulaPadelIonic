import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Alumno, DetalleTecnico, Usuario } from 'src/interfaces/interfaces';
import { AlumnoService } from '../../../services/alumno.service';
import { UsuarioService } from '../../../services/usuario.service';
import { DetalleTecnicoService } from '../../../services/detalle-tecnico.service';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { AddDetallePage } from './add-detalle/add-detalle.page';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { ComiteTecnicoService } from '../../../services/comite-tecnico.service';
import { PopoverDetalleTecnicoComponent } from '../../../components/popover-detalle-tecnico/popover-detalle-tecnico.component';

@Component({
  selector: 'app-detalle-tecnico',
  templateUrl: './detalle-tecnico.page.html',
  styleUrls: ['./detalle-tecnico.page.scss'],
})
export class DetalleTecnicoPage implements OnInit {
  @ViewChild(IonContent, {read: ElementRef, static:true}) seleccionDetalle: ElementRef;
  @ViewChild("triggerElement", {read: ElementRef, static:true}) triggerElement: ElementRef;

  cargando:boolean;
  alumnoId:string
  usuario: Usuario={};
  alumno: Alumno;
  comiteTecnicoId: string;
  detallesTecnicos: DetalleTecnico[]=[]
  terminoBusqueda: string = '';
  observer: IntersectionObserver;
  constructor(private alumnoService: AlumnoService,
    private usuarioService:UsuarioService,
    private detalleTecnicoService:DetalleTecnicoService,
    private comiteTecnicoService: ComiteTecnicoService,
    private modalController:ModalController,
    private uiService: UiServiceService,
    private alertController: AlertController,
    private popoverController: PopoverController,
    private renderer: Renderer2) { }

  async ngOnInit() {
    this.cargando=true;
    this.usuario = this.usuarioService.getUsuario();
    await this.alumnoService.getAlumnoIdActual().then(alumnoId=>{
      this.alumnoId = alumnoId
    })
    await this.alumnoService.getAlumno(this.alumnoId).then(alumno=>{
      this.alumno=alumno[0];
    });
    await this.comiteTecnicoService.getComiteIdActual().then(comiteId=>{
      this.comiteTecnicoId = comiteId
    })

    await this.detalleTecnicoService.getDetallesAlumno(this.comiteTecnicoId).then((detalles:DetalleTecnico[])=>{
      console.log(detalles)
      this.detallesTecnicos=detalles
    })
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

 async mostrarAddDetalle(detalle?:DetalleTecnico){
  const modal = await this.modalController.create({
    component: AddDetallePage,
    componentProps: { usuario: this.usuario , alumnoId:this.alumnoId, comiteTecnicoId:this.comiteTecnicoId, detalle},
  });
  modal.onDidDismiss()
  .then(() => {
  this.ngOnInit()
});
  return await modal.present()
}


async eliminarDetalle(detalle: DetalleTecnico){
  const alert = await this.alertController.create({
  
    header: 'Eliminar detalle técnico',
    message: '¿Estás seguro? Se eliminará el detalle técnico',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
   
        handler: (blah) => {
         
        }
      }, {
        text: 'Eliminar',
        handler: async () => {
          const detalleEliminado = await this.detalleTecnicoService.deleteDetalleTecnico(detalle);
          if (detalleEliminado){
            this.uiService.alertaInformativa('El detalle técnico ha sido eliminado');
            this.ngOnInit()
            
          } else {
            this.uiService.alertaInformativa('Error al eliminar el detalle técnico')
            
          }
        }
      }
    ]
  });

  await alert.present();



}


async abrePopOver(ev:any, detalle: DetalleTecnico){
  const popover = await this.popoverController.create({
    component: PopoverDetalleTecnicoComponent,
    event: ev,
    translucent: true,
    componentProps: { detalle },
    mode:'ios',
    //cerrar tocando fuera
    backdropDismiss: true
  });
  await popover.present();

  const { role } = await popover.onDidDismiss();

}
}
