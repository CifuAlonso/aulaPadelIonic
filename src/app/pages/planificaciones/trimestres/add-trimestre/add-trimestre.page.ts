import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TrimestreService } from 'src/app/services/trimestre.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Trimestre, Usuario } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-add-trimestre',
  templateUrl: './add-trimestre.page.html',
  styleUrls: ['./add-trimestre.page.scss'],
})
export class AddTrimestrePage implements OnInit {
 
  nombre: string = "";
  descripcion: string = "";
  usuario: Usuario={};
  trimestre: Trimestre;
  planificacionId: string;
 actualizaTrimestre:boolean = false;

  constructor(private modalController: ModalController,
    private trimestreService: TrimestreService,
  private uiService: UiServiceService,
    private alertController: AlertController) { }

    
    async ngOnInit() {
      if (this.trimestre != undefined){
        this.actualizaTrimestre=true;
        this.nombre=this.trimestre.nombre;
        this.descripcion= this.trimestre.descripcion;
      }

    }
  
    async ionViewDidEnter(){
      this.ngOnInit();
   }
  
  cerrar() {
    this.modalController.dismiss();
  }

  
  async guardarTrimestre() {
    let trimestre: Trimestre={
    usuarioId:this.usuario.id,
    nombre: this.nombre,
    descripcion: this.descripcion,
    planificacionId: this.planificacionId
    }

    const trimestreCreado = await this.trimestreService.postTrimestre(trimestre);
  
    if (trimestreCreado){
      this.uiService.alertaInformativa('El trimestre ha sido creado');
      this.cerrar()
    } else {
      this.uiService.alertaInformativa('Error al crear trimestre')
      this.cerrar()
    }
  }
  async actualizarTrimestre(){
      this.trimestre.nombre=this.nombre;
      this.trimestre.descripcion=this.descripcion;
      const trimestreActualizado = await this.trimestreService.putTrimestre(this.trimestre);
      if (trimestreActualizado){
        this.uiService.alertaInformativa('El trimestre ha sido actualizado');
        
      } else {
        this.uiService.alertaInformativa('Error al actualizar trimestre')
        
      }
      
    
  }

  async eliminarTrimestre(){
    const alert = await this.alertController.create({
    
      header: 'Eliminar trimestre',
      message: '¿Estás seguro? Se eliminará el trimestre',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
     
          handler: (blah) => {
           
          }
        }, {
          text: 'Eliminar',
          handler: async () => {
            const trimestreEliminado = await this.trimestreService.deleteTrimestre(this.trimestre);
            if (trimestreEliminado){
              this.uiService.alertaInformativa('El trimestre ha sido eliminado');
              this.cerrar()
              
            } else {
              this.uiService.alertaInformativa('Error al eliminar trimestre')
              
            }
          }
        }
      ]
    });

    await alert.present();


  } 
}