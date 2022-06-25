import { Component, OnInit } from '@angular/core';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Usuario } from 'src/interfaces/interfaces';
import { UsuarioService } from '../../../services/usuario.service';
import { NavController, PopoverController } from '@ionic/angular';
import { PopoverCambiaPasswordComponent } from 'src/app/components/popover-cambia-password/popover-cambia-password.component';
import { PasswordPage } from './password/password.page';
import * as moment from 'moment';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {
  usuarioId:Usuario;
  usuario:Usuario
  cargando:boolean=false;
  nombre:string;
  apellidos:string;
  telefono: string;
  nacimiento: any;
  email:string;
 

  constructor(private usuarioService: UsuarioService,
    private uiService: UiServiceService,
    private navCtrl:NavController,
    private popoverController:PopoverController) { }

  async ngOnInit() {
    await this.getDatos()
  }

  async ionViewDidEnter(){
    await this.getDatos();
  }


  async getDatos(){
    this.cargando=true;
    this.usuarioId = this.usuarioService.getUsuario();
    await this.usuarioService.getUsuarioId(this.usuarioId.id).then((usuario:Usuario)=>{
      this.usuario = usuario
      this.nombre = this.usuario.nombre;
      this.apellidos = this.usuario.apellidos;
      this.telefono = this.usuario.telefono;
      this.email = this.usuario.email;
      this.nacimiento = this.usuario.nacimiento;
    })

    this.cargando=false;
  }

  
async actualizarUsuario(){
  this.usuario.nombre=this.nombre
  this.usuario.apellidos=this.apellidos
  this.usuario.email=this.email
  this.usuario.telefono=this.telefono;
  this.usuario.nacimiento = moment(this.nacimiento).format('DD-MM-YYYY');

    const usuarioActualizado = await this.usuarioService.actualizaUsuario(this.usuario);
    if (usuarioActualizado){
      this.uiService.alertaInformativa('El usuario ha sido actualizado');
      
    } else {
      this.uiService.alertaInformativa('Error al actualizar')
      
    }
    
  
  }

  async cambiaPass(ev:any){
    const popover = await this.popoverController.create({
      component: PasswordPage,
      componentProps: {usuario: this.usuario},
      cssClass: 'popover-camara',
      event: ev,
      translucent: true,
      mode:'md',
      //cerrar tocando fuera
      backdropDismiss: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
  }

  cerrar(){
    this.navCtrl.navigateRoot( 'main/tabs/usuario', { animated:true})
  }

}
