import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { IonContent, PopoverController } from '@ionic/angular';
import { AlertController, ModalController } from '@ionic/angular';
import { AlumnoService } from 'src/app/services/alumno.service';
import { FaltasService } from 'src/app/services/faltas.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Alumno, Usuario } from 'src/interfaces/interfaces';
import { Falta } from '../../../interfaces/interfaces';
import { AddFaltaPage } from './add-falta/add-falta.page';
import { PopoverAusenciaComponent } from '../../components/popover-ausencia/popover-ausencia.component';

@Component({
  selector: 'app-faltas',
  templateUrl: './faltas.page.html',
  styleUrls: ['./faltas.page.scss'],
})
export class FaltasPage implements OnInit {
  @ViewChild(IonContent, {read: ElementRef, static:true}) seleccionAusencia: ElementRef;
  @ViewChild("triggerElement", {read: ElementRef, static:true}) triggerElement: ElementRef;

  cargando:boolean;
  alumnoId:string
  usuario: Usuario={};
  alumno: Alumno;
  faltas: Falta[]=[]
  terminoBusqueda: string = '';
  observer: IntersectionObserver;
  eliminados:Falta[]=[]
  seleccionaEliminar=false;
  activateAnimation=false;
  constructor(private alumnoService: AlumnoService,
    private usuarioService:UsuarioService,
    private faltaService:FaltasService,
    private modalController:ModalController,
    private uiService: UiServiceService,
    private alertController: AlertController,
    private renderer: Renderer2,
    private popoverController: PopoverController,) { }

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
    await this.faltaService.getFaltasAlumno(this.alumnoId,this.usuario.id).then((faltas:Falta[])=>{
      this.faltas=faltas
    })
    this.observer = new IntersectionObserver((entries)=>{
      entries.forEach((entry:any)=>{
        if (entry.isIntersecting){
          this.renderer.addClass(this.seleccionAusencia.nativeElement, 'no-transform')
        }else {
          this.renderer.removeClass(this.seleccionAusencia.nativeElement, 'no-transform')
     
        }
      })
    })
    this.observer.observe(this.triggerElement.nativeElement);
    this.cargando=false;
  }

  async ionViewDidEnter(){
    await this.ngOnInit()
 }

 onPress($event, falta:Falta) {
  this.seleccionaEliminar=true;
  falta.animaTarjeta = true
  if (falta.colorTarjeta === undefined || falta.colorTarjeta==='white') {
    falta.colorTarjeta= "#e6e7be85";
    this.eliminados.push(falta);
  }
  else {
    falta.colorTarjeta= "white";
    this.sacadeEliminados(falta)
    if (this.eliminados.length===0){
      this.seleccionaEliminar=false;
    }
  }

}

onPressUp($event, falta:Falta) {
if (this.eliminados.length===0){
  this.seleccionaEliminar=false;
}
falta.animaTarjeta=false;
}

sacadeEliminados(falta:Falta){
this.eliminados.forEach((value,index)=>{
  if(value==falta) this.eliminados.splice(index,1);
});
}

clickTarjeta(falta:Falta){
if (this.seleccionaEliminar){
 
  falta.animaTarjeta=false;
  if (falta.colorTarjeta === undefined || falta.colorTarjeta==='white') {
    falta.animaTarjeta = true
    falta.colorTarjeta= "#e6e7be85";
    this.eliminados.push(falta);
  }
  else {
    if (this.eliminados.length > 1){
      falta.animaTarjeta = true
      falta.colorTarjeta= "white";
    this.sacadeEliminados(falta)
    }
  }


} else {

}
}


 async mostrarAddFalta(falta?:Falta){
  const modal = await this.modalController.create({
    component: AddFaltaPage,
    componentProps: { usuario: this.usuario , alumnoId:this.alumnoId, falta},
  });
  modal.onDidDismiss()
  .then(() => {
  this.ngOnInit()
});
  return await modal.present()
}


async eliminarFalta(){
  const alert = await this.alertController.create({
  
    header: 'Eliminar ausencisa',
    message: '¿Estás seguro? Se eliminarán las ausencias seleccionadas',
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
          for (let falta of this.eliminados){
           await this.faltaService.deleteFalta(falta);
            contador++;
          }
         
          if (contador=== this.eliminados.length){
            this.uiService.alertaInformativa('Las ausencias han sido eliminadas');
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
async abrePopOver(ev:any, ausencia: Falta){
  if (!this.seleccionaEliminar){
  const popover = await this.popoverController.create({
    component: PopoverAusenciaComponent,
    event: ev,
    translucent: true,
    componentProps: { ausencia },
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
   await this.faltaService.enviaAusencia(comite.id,this.usuario.id,this.alumnoId);
    contador++;
  }
 
  if (contador=== this.eliminados.length){
    this.uiService.alertaInformativa('Las ausencias han sido enviadas');
    this.ngOnInit()

    
  } else {
    this.uiService.alertaInformativa('Error al enviar')
    
  }

}

}
