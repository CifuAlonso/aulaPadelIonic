import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TrimestreService } from 'src/app/services/trimestre.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Semana, Usuario } from 'src/interfaces/interfaces';
import { SemanaService } from '../../../../../services/semana.service';

@Component({
  selector: 'app-add-semana',
  templateUrl: './add-semana.page.html',
  styleUrls: ['./add-semana.page.scss'],
})
export class AddSemanaPage implements OnInit {
 
  nombre: string = "";
  descripcion: string = "";
  usuario: Usuario={};
  semana: Semana;
  planificacionId: string;
  trimestreId:string;
 actualizaSemana:boolean = false;

  constructor(private modalController: ModalController,
    private semanaService: SemanaService,
  private uiService: UiServiceService,
    private alertController: AlertController) { }

    
    async ngOnInit() {
      if (this.semana != undefined){
        this.actualizaSemana=true;
        this.nombre=this.semana.nombre;
        this.descripcion= this.semana.descripcion;
      }

    }
  
    async ionViewDidEnter(){
      this.ngOnInit();
   }
  
  cerrar() {
    this.modalController.dismiss();
  }

  
  async guardarSemana() {
    let semana: Semana={
    usuarioId:this.usuario.id,
    nombre: this.nombre,
    descripcion: this.descripcion,
    planificacionId: this.planificacionId,
    trimestreId: this.trimestreId
    }

    const semanaCreada = await this.semanaService.postSemana(semana);
  
    if (semanaCreada){
      this.uiService.alertaInformativa('La semana ha sido creada');
      this.cerrar()
    } else {
      this.uiService.alertaInformativa('Error al crear la semana')
      this.cerrar()
    }
  }
  async actualizarSemana(){
      this.semana.nombre=this.nombre;
      this.semana.descripcion=this.descripcion;
      const semanaActualizada = await this.semanaService.putSemana(this.semana);
      if (semanaActualizada){
        this.uiService.alertaInformativa('La semana ha sido actualizada');
        
      } else {
        this.uiService.alertaInformativa('Error al actualizar la semana')
        
      }
      
    
  }

  async eliminarSemana(){
    const alert = await this.alertController.create({
    
      header: 'Eliminar semana',
      message: '¿Estás seguro? Se eliminará la semana',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
     
          handler: (blah) => {
           
          }
        }, {
          text: 'Eliminar',
          handler: async () => {
            const semanaEliminada = await this.semanaService.deleteSemana(this.semana);
            if (semanaEliminada){
              this.uiService.alertaInformativa('La semana ha sido eliminada');
              this.cerrar()
              
            } else {
              this.uiService.alertaInformativa('Error al eliminar semana')
              
            }
          }
        }
      ]
    });

    await alert.present();


  } 

}
