import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { CondicionesPage } from './condiciones/condiciones.page';
import { PrivacidadPage } from './privacidad/privacidad.page';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {

  constructor(private modalController:ModalController,
    private navCtrl:NavController,) { }

  ngOnInit() {
  }

  async mostrarCondiciones(){
    const modal = await this.modalController.create({
      component: CondicionesPage,
  
    });
    modal.onDidDismiss()
    .then(() => {
    this.ngOnInit()
  });
    return await modal.present()
  }

  
  async mostrarPrivacidad(){
    const modal = await this.modalController.create({
      component: PrivacidadPage,
  
    });
    modal.onDidDismiss()
    .then(() => {
    this.ngOnInit()
  });
    return await modal.present()
  }

  goToTutoriales(){
    this.navCtrl.navigateRoot( 'main/tabs/informacion/tutoriales', { animated:true})
  }


}
