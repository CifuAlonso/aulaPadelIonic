import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { FaltasService } from 'src/app/services/faltas.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Falta, Usuario } from '../../../../interfaces/interfaces';

@Component({
  selector: 'app-add-falta',
  templateUrl: './add-falta.page.html',
  styleUrls: ['./add-falta.page.scss'],
})
export class AddFaltaPage implements OnInit {

  nombreFalta: string = "";
  observaciones: string = "";
  fecha: any="";
  usuario: Usuario={};
  alumnoId:string;
  falta: Falta
  actualizaFalta:boolean = false;

  constructor(private modalController: ModalController,
    private faltaService: FaltasService,
    private uiService: UiServiceService,
    private alertController: AlertController) { }

    async ngOnInit() {
      if (this.falta != undefined){
        this.actualizaFalta=true;
        this.nombreFalta=this.falta.motivo;
        this.observaciones= this.falta.observaciones;
        this.fecha= moment(this.falta.fecha,'DD-MM-YYYY').toString()
        
      }
    }
  
    async ionViewDidEnter(){
      this.ngOnInit();
   }
  
  cerrar() {
    this.modalController.dismiss();
  }

  
  async guardarFalta() {
    let falta: Falta={
    alumnoId:this.alumnoId,
    profesorId:this.usuario.id,
    motivo: this.nombreFalta,
    observaciones: this.observaciones,
    fecha: moment(this.fecha).format('DD-MM-YYYY'),
    }

    const faltaCreada = await this.faltaService.postFalta(falta);
  
    if (faltaCreada){
      this.uiService.alertaInformativa('La ausencia ha sido creada');
      this.cerrar()
    } else {
      this.uiService.alertaInformativa('Error al crear la ausencia')
      this.cerrar()
    }
  }
  async actualizarFalta(){
      this.falta.motivo=this.nombreFalta;
      this.falta.observaciones=this.observaciones;
      this.falta.fecha=moment(this.fecha).format('DD-MM-YYYY');
    
      const faltaActualizada = await this.faltaService.putFalta(this.falta);
      if (faltaActualizada){
        this.uiService.alertaInformativa('La ausencia ha sido actualizada');
        
      } else {
        this.uiService.alertaInformativa('Error al actualizar la ausencia')
        
      }
      
    
  }

  async eliminarFalta(){
    const alert = await this.alertController.create({
    
      header: 'Eliminar ausencia',
      message: '¿Estás seguro? Se eliminará la ausencia',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
     
          handler: (blah) => {
           
          }
        }, {
          text: 'Eliminar',
          handler: async () => {
            const faltaEliminada = await this.faltaService.deleteFalta(this.falta);
            if (faltaEliminada){
              this.uiService.alertaInformativa('La ausencia ha sido eliminada');
              this.cerrar()
              
            } else {
              this.uiService.alertaInformativa('Error al eliminar la ausencia')
              
            }
          }
        }
      ]
    });

    await alert.present();


  
}
}
