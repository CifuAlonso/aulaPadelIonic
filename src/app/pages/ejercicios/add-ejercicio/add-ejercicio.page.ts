import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { EjercicioService } from 'src/app/services/ejercicio.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Ejercicio, GrupoEjercicios, Usuario, Grupo } from '../../../../interfaces/interfaces';
import { GrupoEjerciciosService } from '../../../services/grupo-ejercicios.service';

@Component({
  selector: 'app-add-ejercicio',
  templateUrl: './add-ejercicio.page.html',
  styleUrls: ['./add-ejercicio.page.scss'],
})
export class AddEjercicioPage implements OnInit {

  nombre: string = "";
  descripcion: string = "";
  usuario: Usuario = {};
  ejercicio: Ejercicio = {};
  actualizaEjercicio:boolean = false;
  gruposEjercicios: GrupoEjercicios[]=[]
  grupoId="0";
  
  constructor(private modalController: ModalController,
    private usuarioService: UsuarioService,
    private ejercicioService: EjercicioService,
    private uiService: UiServiceService,
    private grupoEjerciciosService: GrupoEjerciciosService,
    private alertController: AlertController,
    private navCtrl:NavController) { }

  async ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
    await this.grupoEjerciciosService.getGruposUsuario(this.usuario.id).then((grupoEjercicios:GrupoEjercicios[])=>{
      this.gruposEjercicios = grupoEjercicios
    })
    if (this.ejercicio.nombre != undefined){
      this.actualizaEjercicio=true;
      this.nombre=this.ejercicio.nombre;
      this.descripcion= this.ejercicio.descripcion;
      this.grupoId=this.ejercicio.grupoEjerciciosId.toString();
    }
  }


  async ionViewDidEnter() {
    this.usuario = this.usuarioService.getUsuario();
  }

  async  cerrar() {
    this.modalController.dismiss();
    
  }

  sleep(ms = 0) {
    return new Promise((r) => setTimeout(r, ms));
  }


  async guardarEjercicio() {
    let ejercicio: Ejercicio={
    nombre: this.nombre,
    descripcion: this.descripcion,
    usuarioId: this.usuario.id,
    grupoEjerciciosId: this.grupoId
    }
    
    const ejercicioCreado = await this.ejercicioService.postEjercicio(ejercicio);
    console.log(ejercicioCreado)
    if (ejercicioCreado){

      this.alertaAnimacion(ejercicioCreado);
  
     
    } else {
      this.uiService.alertaInformativa('Error al crear el ejercicio')
      this.cerrar()
    }
  }

  async alertaAnimacion(ejercicio:Ejercicio) {
    const alert = await this.alertController.create({
      header: 'Ejercicio creado',
      message: '¿Quieres crear una animación para este ejercicio?',
      buttons: [
       {
          text: 'Sí',
        
          handler: async () => {
            await this.ejercicioService.setEjercicioIdActual(ejercicio.id)
            this.cerrar()
            this.goToAnimacion()
          }
        },
        {
          text: 'Ahora no',
          role: 'cancel',
          cssClass: 'secondary',
        
          handler: async () => {
            this.cerrar()
            await this.sleep(1000);
          window.location.reload();
          }
        },
      ]
    });

    await alert.present();
  }

  goToAnimacion(){
    this.navCtrl.navigateRoot( 'animacion-ejercicio', { animated:true})
  }

  async actualizarEjercicio(){
    this.ejercicio.nombre=this.nombre;
    this.ejercicio.descripcion=this.descripcion;
    this.ejercicio.grupoEjerciciosId = this.grupoId;
    const ejercicioActualizado = await this.ejercicioService.putEjercicio(this.ejercicio);
    if (ejercicioActualizado){
      this.uiService.alertaInformativa('El ejercicio ha sido actualizado');
      
    } else {
      this.uiService.alertaInformativa('Error al actualizar el ejercicio')
      
    }
    
  
}


}
