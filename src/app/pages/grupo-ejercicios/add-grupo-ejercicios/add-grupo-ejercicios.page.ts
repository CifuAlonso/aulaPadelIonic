import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { GrupoEjerciciosService } from 'src/app/services/grupo-ejercicios.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Usuario } from 'src/interfaces/interfaces';
import { GrupoEjercicios } from '../../../../interfaces/interfaces';


@Component({
  selector: 'app-add-grupo-ejercicios',
  templateUrl: './add-grupo-ejercicios.page.html',
  styleUrls: ['./add-grupo-ejercicios.page.scss'],
})
export class AddGrupoEjerciciosPage implements OnInit {

  nombre: string = "";
  descripcion: string = "";
  usuario: Usuario={};
  grupoEjercicios: GrupoEjercicios;
  actualizaGrupo:boolean = false;

  constructor(private modalController: ModalController,
    private grupoEjerciciosService: GrupoEjerciciosService,
  private uiService: UiServiceService,
    private alertController: AlertController) { }

    async ngOnInit() {
      if (this.grupoEjercicios != undefined){
        this.actualizaGrupo=true;
        this.nombre=this.grupoEjercicios.nombre;
        this.descripcion= this.grupoEjercicios.descripcion;
      }

    }
  
    async ionViewDidEnter(){
      this.ngOnInit();
   }
  
  cerrar() {
    this.modalController.dismiss();
  }

  
  async guardarGrupo() {
    let grupo: GrupoEjercicios={
    usuarioId:this.usuario.id,
    nombre: this.nombre,
    descripcion: this.descripcion
    }

    const grupoCreado = await this.grupoEjerciciosService.postGrupoEjercicios(grupo);
  
    if (grupoCreado){
      this.uiService.alertaInformativa('El grupo de ejercicios ha sido creado');
      this.cerrar()
    } else {
      this.uiService.alertaInformativa('Error al crear el grupo')
      this.cerrar()
    }
  }
  async actualizarGrupo(){
      this.grupoEjercicios.nombre=this.nombre;
      this.grupoEjercicios.descripcion=this.descripcion;
      const grupoActualizado = await this.grupoEjerciciosService.putGrupoEjercicios(this.grupoEjercicios);
      if (grupoActualizado){
        this.uiService.alertaInformativa('El grupo ha sido actualizado');
        
      } else {
        this.uiService.alertaInformativa('Error al actualizar el grupo')
        
      }
      
    
  }

  async eliminarGrupo(){
    const alert = await this.alertController.create({
    
      header: 'Eliminar grupo de ejercicios',
      message: '¿Estás seguro? Se eliminará el grupo',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
     
          handler: (blah) => {
           
          }
        }, {
          text: 'Eliminar',
          handler: async () => {
            const grupoEliminado = await this.grupoEjerciciosService.deleteGrupoEjercicios(this.grupoEjercicios);
            if (grupoEliminado){
              this.uiService.alertaInformativa('El grupo ha sido eliminado');
              this.cerrar()
              
            } else {
              this.uiService.alertaInformativa('Error al eliminar el grupo')
              
            }
          }
        }
      ]
    });

    await alert.present();


  
}
}
