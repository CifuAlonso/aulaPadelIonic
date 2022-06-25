import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ComportamientoService } from 'src/app/services/comportamiento.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Usuario } from 'src/interfaces/interfaces';
import { Comportamiento } from '../../../../../interfaces/interfaces';

@Component({
  selector: 'app-add-comportamiento',
  templateUrl: './add-comportamiento.page.html',
  styleUrls: ['./add-comportamiento.page.scss'],
})
export class AddComportamientoPage implements OnInit {
  nombre: string = "";
  observaciones: string = "";
  alumnoId:string
  comiteTecnicoId:string;
  usuario: Usuario={};
  comportamiento: Comportamiento
  actualizaComportamiento:boolean = false;

  constructor(private modalController: ModalController,
    private comportamientoService: ComportamientoService,
    private uiService: UiServiceService,
    private alertController: AlertController) { }

    async ngOnInit() {
      if (this.comportamiento != undefined){
        this.actualizaComportamiento=true;
        this.nombre=this.comportamiento.nombre;
        this.observaciones= this.comportamiento.observaciones;
      }

    }
  
    async ionViewDidEnter(){
      this.ngOnInit();
   }
  
  cerrar() {
    this.modalController.dismiss();
  }

  
  async guardarComportamiento() {
    let comportamiento: Comportamiento={
    alumnoId:this.alumnoId,
    profesorId:this.usuario.id,
    comiteTecnicoId:this.comiteTecnicoId,
    observaciones:this.observaciones,
    nombre:this.nombre
 
    }

    const comportamientoCreado = await this.comportamientoService.postComportamientoTecnico(comportamiento);
  
    if (comportamientoCreado){
      this.uiService.alertaInformativa('El comportamiento ha sido creado');
      this.cerrar()
    } else {
      this.uiService.alertaInformativa('Error al crear el comportamiento')
      this.cerrar()
    }
  }
  async actualizarComportamiento(){
      this.comportamiento.nombre=this.nombre;
      this.comportamiento.observaciones=this.observaciones;
      const comportamientoActualizado = await this.comportamientoService.putComportamiento(this.comportamiento);
      if (comportamientoActualizado){
        this.uiService.alertaInformativa('El comportamiento ha sido actualizado');
        
      } else {
        this.uiService.alertaInformativa('Error al actualizar el comportamiento')
        
      }
      
    
  }

  async eliminarComportamiento(){
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
            const comportamientoEliminado = await this.comportamientoService.deleteComportamiento(this.comportamiento);
            if (comportamientoEliminado){
              this.uiService.alertaInformativa('El comportamiento ha sido eliminado');
              this.cerrar()
              
            } else {
              this.uiService.alertaInformativa('Error al eliminar el comportamiento')
              
            }
          }
        }
      ]
    });

    await alert.present();


  
}

}
