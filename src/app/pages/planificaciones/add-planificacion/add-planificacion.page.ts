import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { PlanificacionesService } from 'src/app/services/planificaciones.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Usuario } from 'src/interfaces/interfaces';
import { Planificacion } from '../../../../interfaces/interfaces';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-add-planificacion',
  templateUrl: './add-planificacion.page.html',
  styleUrls: ['./add-planificacion.page.scss'],
})
export class AddPlanificacionPage implements OnInit {

 
  nombre: string = "";
  descripcion: string = "";
  usuario: Usuario={};
  planificacion: Planificacion;
  actualizaPlanificacion:boolean = false;

  constructor(private modalController: ModalController,
    private planificacionService: PlanificacionesService,
  private uiService: UiServiceService,
    private alertController: AlertController,
    private usuarioService: UsuarioService) { }

    async ngOnInit() {
      this.usuario = this.usuarioService.getUsuario();
      if (this.planificacion != undefined){
        this.actualizaPlanificacion=true;
        this.nombre=this.planificacion.nombre;
        this.descripcion= this.planificacion.descripcion;
      }

    }
  
    async ionViewDidEnter(){
      this.ngOnInit();
   }
  
  cerrar() {
    this.modalController.dismiss();
  }

  
  async guardarPlanificacion() {
    let planificacion: Planificacion={
    usuarioId:this.usuario.id,
    nombre: this.nombre,
    descripcion: this.descripcion
    }

    const planificacionCreada = await this.planificacionService.postPlanificacion(planificacion);
  
    if (planificacionCreada){
      this.uiService.alertaInformativa('La planificacion ha sido creada');
      this.cerrar()
      await this.sleep(1000);
      window.location.reload();
    } else {
      this.uiService.alertaInformativa('Error al crear planificacion')
      this.cerrar()
    }
  }
  async actualizarPlanificacion(){
      this.planificacion.nombre=this.nombre;
      this.planificacion.descripcion=this.descripcion;
      const planificacionActualizada = await this.planificacionService.putPlanificacion(this.planificacion);
      if (planificacionActualizada){
        this.uiService.alertaInformativa('La planificacion ha sido actualizada');
        
      } else {
        this.uiService.alertaInformativa('Error al actualizar planificacion')
        
      }
      
    
  }
  sleep(ms = 0) {
    return new Promise((r) => setTimeout(r, ms));
  }

  async eliminarPlanificacion(){
    const alert = await this.alertController.create({
    
      header: 'Eliminar planificacion',
      message: '¿Estás seguro? Se eliminará la planificacion',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
     
          handler: (blah) => {
           
          }
        }, {
          text: 'Eliminar',
          handler: async () => {
            const planificacionEliminado = await this.planificacionService.deletePlanificacion(this.planificacion);
            if (planificacionEliminado){
              this.uiService.alertaInformativa('La planificacion ha sido eliminada');
              this.cerrar()
              
            } else {
              this.uiService.alertaInformativa('Error al eliminar planificacion')
              
            }
          }
        }
      ]
    });

    await alert.present();


  
}
}
