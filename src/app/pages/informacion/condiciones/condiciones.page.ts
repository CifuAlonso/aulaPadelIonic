import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-condiciones',
  templateUrl: './condiciones.page.html',
  styleUrls: ['./condiciones.page.scss'],
})
export class CondicionesPage implements OnInit {

  constructor(private modalController:ModalController) { }

  ngOnInit() {
  }

  async  cerrar() {
    this.modalController.dismiss();
    
  }
}
