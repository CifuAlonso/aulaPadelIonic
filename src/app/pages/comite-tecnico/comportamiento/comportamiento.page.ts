import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { AlumnoService } from 'src/app/services/alumno.service';
import { ComportamientoService } from 'src/app/services/comportamiento.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Alumno, Comportamiento, Usuario } from 'src/interfaces/interfaces';
import { AddComportamientoPage } from './add-comportamiento/add-comportamiento.page';
import { ComiteTecnicoService } from '../../../services/comite-tecnico.service';
import { PopoverComportamientoComponent } from '../../../components/popover-comportamiento/popover-comportamiento.component';

@Component({
  selector: 'app-comportamiento',
  templateUrl: './comportamiento.page.html',
  styleUrls: ['./comportamiento.page.scss'],
})
export class ComportamientoPage implements OnInit {

  cargando:boolean;
  alumnoId:string;
  comiteTecnicoId:string;
  usuario: Usuario={};
  alumno: Alumno;
  comportamientos: Comportamiento[]=[]
  terminoBusqueda: string = '';
  
  constructor(private alumnoService: AlumnoService,
    private usuarioService:UsuarioService,
    private comiteTecnicoService:ComiteTecnicoService,
    private comportamientoService:ComportamientoService,
    private modalController:ModalController,
    private uiService: UiServiceService,
    private alertController: AlertController,
    private popoverController: PopoverController,) { }

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
    await this.comportamientoService.getComportamientosAlumno(this.comiteTecnicoId).then((comportamientos:Comportamiento[])=>{
      this.comportamientos=comportamientos
    })
    this.cargando=false;
    
  }

  async ionViewDidEnter(){
    await this.ngOnInit()
 }

 async mostrarAddComportamiento(comportamiento?:Comportamiento){
  const modal = await this.modalController.create({
    component: AddComportamientoPage,
    componentProps: { usuario: this.usuario , alumnoId:this.alumnoId,comiteTecnicoId:this.comiteTecnicoId, comportamiento},
  });
  modal.onDidDismiss()
  .then(() => {
  this.ngOnInit()
});
  return await modal.present()
}

async eliminarComportamiento(comportamiento:Comportamiento){
  const alert = await this.alertController.create({
  
    header: 'Eliminar comportamiento',
    message: '¿Estás seguro? Se eliminará el comportamiento',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
   
        handler: (blah) => {
         
        }
      }, {
        text: 'Eliminar',
        handler: async () => {
          const comportamientoEliminado = await this.comportamientoService.deleteComportamiento(comportamiento);
          if (comportamientoEliminado){
            this.uiService.alertaInformativa('El comportamiento ha sido eliminado');
        this.ngOnInit()
            
          } else {
            this.uiService.alertaInformativa('Error al eliminar el comportamiento')
            
          }
        }
      }
    ]
  });

  await alert.present();
}

async abrePopOver(ev:any, comportamiento: Comportamiento){
  const popover = await this.popoverController.create({
    component: PopoverComportamientoComponent,
    event: ev,
    translucent: true,
    componentProps: { comportamiento },
    mode:'ios',
    //cerrar tocando fuera
    backdropDismiss: true
  });
  await popover.present();

  const { role } = await popover.onDidDismiss();

}
}
