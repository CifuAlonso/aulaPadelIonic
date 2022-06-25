import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-notificaciones-usuario',
  templateUrl: './notificaciones-usuario.page.html',
  styleUrls: ['./notificaciones-usuario.page.scss'],
})
export class NotificacionesUsuarioPage implements OnInit {

  constructor(private navCtrl:NavController) { }

  ngOnInit() {
  }

  cerrar(){
    this.navCtrl.navigateRoot( 'main/tabs/usuario', { animated:true})
  }

  actualizarNotificaciones(){
    
  }

}
