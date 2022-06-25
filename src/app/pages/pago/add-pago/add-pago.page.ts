import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Pago, Usuario } from 'src/interfaces/interfaces';
import { PagoService } from '../../../services/pago.service';

@Component({
  selector: 'app-add-pago',
  templateUrl: './add-pago.page.html',
  styleUrls: ['./add-pago.page.scss'],
})
export class AddPagoPage implements OnInit {

  cantidad: string = "";
  moneda: string = "";
  observaciones: string = "";
  fecha: any="";
  usuario: Usuario={};
  alumnoId:string;
  pago: Pago
  actualizaPago:boolean = false;

  constructor(private modalController: ModalController,
    private pagoService: PagoService,
    private uiService: UiServiceService,
    private alertController: AlertController) { }

    async ngOnInit() {
      if (this.pago != undefined){
        console.log(this.pago)
        this.actualizaPago=true;
        this.cantidad=this.pago.cantidad;
        this.moneda= this.pago.moneda;
        this.fecha= moment(this.pago.fecha,'DD-MM-YYYY').toString()
        this.observaciones= this.pago.observaciones;
      }
    }
  
    async ionViewDidEnter(){
      this.ngOnInit();
   }
  
  cerrar() {
    this.modalController.dismiss();
  }

  
  async guardarPago() {
    let pago: Pago={
    alumnoId:this.alumnoId,
    profesorId:this.usuario.id,
    cantidad: this.cantidad,
    moneda: this.moneda,
    fecha: moment(this.fecha).format('DD-MM-YYYY'),
    observaciones: this.observaciones,
    }

    const pagoCreado = await this.pagoService.postPago(pago);
  
    if (pagoCreado){
      this.uiService.alertaInformativa('El pago ha sido creado');
      this.cerrar()
    } else {
      this.uiService.alertaInformativa('Error al crear el pago')
      this.cerrar()
    }
  }
  async actualizarPago(){
      this.pago.cantidad=this.cantidad;
      this.pago.moneda=this.moneda;
      this.pago.observaciones= this.observaciones;
      this.pago.fecha=moment(this.fecha).format('DD-MM-YYYY');
    
      const pagoActualizado = await this.pagoService.putPago(this.pago);
      if (pagoActualizado){
        this.uiService.alertaInformativa('El pago ha sido actualizado');
        
      } else {
        this.uiService.alertaInformativa('Error al actualizar el pago')
        
      }
      
    
  }

  async eliminarPago(){
    const alert = await this.alertController.create({
    
      header: 'Eliminar pago',
      message: '¿Estás seguro? Se eliminará el pago',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
     
          handler: (blah) => {
           
          }
        }, {
          text: 'Eliminar',
          handler: async () => {
            const pagoEliminado = await this.pagoService.deletePago(this.pago);
            if (pagoEliminado){
              this.uiService.alertaInformativa('El pago ha sido eliminado');
              this.cerrar()
              
            } else {
              this.uiService.alertaInformativa('Error al eliminar el pago')
              
            }
          }
        }
      ]
    });

    await alert.present();


  
}

}
