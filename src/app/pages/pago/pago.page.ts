import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { AlertController, IonContent, ModalController, PopoverController } from '@ionic/angular';
import { AlumnoService } from 'src/app/services/alumno.service';
import { PagoService } from 'src/app/services/pago.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Alumno, Pago, Usuario } from 'src/interfaces/interfaces';
import { AddPagoPage } from './add-pago/add-pago.page';
import { PopoverPagoComponent } from '../../components/popover-pago/popover-pago.component';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {
  @ViewChild(IonContent, {read: ElementRef, static:true}) seleccionPago: ElementRef;
  @ViewChild("triggerElement", {read: ElementRef, static:true}) triggerElement: ElementRef;
  cargando:boolean;
  alumnoId:string
  usuario: Usuario={};
  alumno: Alumno;
  pagos: Pago[]=[]
  observer: IntersectionObserver;
  terminoBusqueda: string = '';
  eliminados:Pago[]=[]
  seleccionaEliminar=false;
  activateAnimation=false;




  constructor(private alumnoService: AlumnoService,
    private usuarioService:UsuarioService,
    private pagoService:PagoService,
    private modalController:ModalController,
    private uiService: UiServiceService,
    private alertController: AlertController,
    private popOverController:PopoverController,
    private renderer: Renderer2,) { }

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
    await this.pagoService.getPagosAlumno(this.alumnoId,this.usuario.id).then((pagos:Pago[])=>{
      this.pagos=pagos
      this.pagos.sort(function (a, b) {
        if (a.fecha < b.fecha) {
          return 1;
        }
        if (a.fecha > b.fecha) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    })
    this.observer = new IntersectionObserver((entries)=>{
      entries.forEach((entry:any)=>{
        if (entry.isIntersecting){
          this.renderer.addClass(this.seleccionPago.nativeElement, 'no-transform')
        }else {
          this.renderer.removeClass(this.seleccionPago.nativeElement, 'no-transform')
     
        }
      })
    })
    this.observer.observe(this.triggerElement.nativeElement);
    this.cargando=false;
  }

  async ionViewDidEnter(){
    await this.ngOnInit()
 }

 
 onPress($event, pago:Pago) {
  this.seleccionaEliminar=true;
  pago.animaTarjeta = true
  if (pago.colorTarjeta === undefined || pago.colorTarjeta==='white') {
    pago.colorTarjeta= "#e6e7be85";
    this.eliminados.push(pago);
  }
  else {
    pago.colorTarjeta= "white";
    this.sacadeEliminados(pago)
    if (this.eliminados.length===0){
      this.seleccionaEliminar=false;
    }
  }

}

onPressUp($event, pago:Pago) {
if (this.eliminados.length===0){
  this.seleccionaEliminar=false;
}
pago.animaTarjeta=false;
}

sacadeEliminados(pago:Pago){
this.eliminados.forEach((value,index)=>{
  if(value==pago) this.eliminados.splice(index,1);
});
}

clickTarjeta(pago:Pago){
if (this.seleccionaEliminar){
 
  pago.animaTarjeta=false;
  if (pago.colorTarjeta === undefined || pago.colorTarjeta==='white') {
    pago.animaTarjeta = true
    pago.colorTarjeta= "#e6e7be85";
    this.eliminados.push(pago);
  }
  else {
    if (this.eliminados.length > 1){
      pago.animaTarjeta = true
      pago.colorTarjeta= "white";
    this.sacadeEliminados(pago)
    }
  }


} else {

}
}

 async mostrarAddPago(pago?:Pago){

  const modal = await this.modalController.create({
    component: AddPagoPage,
    componentProps: { usuario: this.usuario , alumnoId:this.alumnoId, pago},
  });
  modal.onDidDismiss()
  .then(() => {
  this.ngOnInit()
});
  return await modal.present()
}


async eliminarPago(){
  const alert = await this.alertController.create({
  
    header: 'Eliminar pagos',
    message: '¿Estás seguro? Se eliminarán los pagos seleccionados',
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
          for (let pago of this.eliminados){
           await this.pagoService.deletePago(pago);
            contador++;
          }
         
          if (contador=== this.eliminados.length){
            this.uiService.alertaInformativa('Los pagos han sido eliminados');
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

async abrePopOver(ev:any, pago: Pago){
  if (!this.seleccionaEliminar){
  const popover = await this.popOverController.create({
    component: PopoverPagoComponent,
    event: ev,
    translucent: true,
    componentProps: { pago },
    mode:'ios',
    //cerrar tocando fuera
    backdropDismiss: true
  });
  await popover.present();

  const { role } = await popover.onDidDismiss();
  }
}
async enviaPdf(){
  let contador = 0;
  for (let comite of this.eliminados){
   await this.pagoService.enviaPago(comite.id,this.usuario.id,this.alumnoId);
    contador++;
  }
 
  if (contador=== this.eliminados.length){
    this.uiService.alertaInformativa('Las pagos han sido enviados');
    this.ngOnInit()

    
  } else {
    this.uiService.alertaInformativa('Error al enviar')
    
  }


}
}
