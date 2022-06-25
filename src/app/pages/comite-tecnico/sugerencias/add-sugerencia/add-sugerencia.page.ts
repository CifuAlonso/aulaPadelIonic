import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { SugerenciaService } from 'src/app/services/sugerencia.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Usuario } from 'src/interfaces/interfaces';
import { Sugerencia } from '../../../../../interfaces/interfaces';

@Component({
  selector: 'app-add-sugerencia',
  templateUrl: './add-sugerencia.page.html',
  styleUrls: ['./add-sugerencia.page.scss'],
})
export class AddSugerenciaPage implements OnInit {

 
  textoSugerencia: string = "";
  alumnoId:string
  usuario: Usuario={};
  sugerencia: Sugerencia;
  comiteTecnicoId:string;
  actualizasugerencia:boolean = false;

  constructor(private modalController: ModalController,
    private sugerenciaService: SugerenciaService,
    private uiService: UiServiceService,
    private alertController: AlertController) { }

    async ngOnInit() {
      if (this.sugerencia != undefined){
        this.actualizasugerencia=true;
        this.textoSugerencia=this.sugerencia.sugerencia;
      }

    }
  
    async ionViewDidEnter(){
      this.ngOnInit();
   }
  
  cerrar() {
    this.modalController.dismiss();
  }

  
  async guardarsugerencia() {
    let sugerencia: Sugerencia={
    alumnoId:this.alumnoId,
    profesorId:this.usuario.id,
    comiteTecnicoId:this.comiteTecnicoId,
    sugerencia: this.textoSugerencia,
   
    }

    const sugerenciaCreado = await this.sugerenciaService.postSugerencia(sugerencia);
  
    if (sugerenciaCreado){
      this.uiService.alertaInformativa('La sugerencia ha sido creada');
      this.cerrar()
    } else {
      this.uiService.alertaInformativa('Error al crear sugerencia')
      this.cerrar()
    }
  }
  async actualizarsugerencia(){
      this.sugerencia.sugerencia=this.textoSugerencia;
    
      const sugerenciaActualizado = await this.sugerenciaService.putSugerencia(this.sugerencia);
      if (sugerenciaActualizado){
        this.uiService.alertaInformativa('La sugerencia ha sido actualizada');
        
      } else {
        this.uiService.alertaInformativa('Error al actualizar la sugerencia')
        
      }
      
    
  }

  async eliminarsugerencia(){
    const alert = await this.alertController.create({
    
      header: 'Eliminar sugerencia ',
      message: '¿Estás seguro? Se eliminará la sugerencia ',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
     
          handler: (blah) => {
           
          }
        }, {
          text: 'Eliminar',
          handler: async () => {
            const sugerenciaEliminado = await this.sugerenciaService.deleteSugerencia(this.sugerencia);
            if (sugerenciaEliminado){
              this.uiService.alertaInformativa('La sugerencia ha sido eliminada');
              this.cerrar()
              
            } else {
              this.uiService.alertaInformativa('Error al eliminar sugerencia')
              
            }
          }
        }
      ]
    });

    await alert.present();


  
}
}
