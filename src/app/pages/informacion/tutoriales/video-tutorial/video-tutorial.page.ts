import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-video-tutorial',
  templateUrl: './video-tutorial.page.html',
  styleUrls: ['./video-tutorial.page.scss'],
})
export class VideoTutorialPage implements OnInit {

  nombre:string
 
  constructor(private modalController:ModalController) { }

  ngOnInit() {
    console.log(this.nombre)
  }

  async  cerrar() {
    this.modalController.dismiss();
  }



}
