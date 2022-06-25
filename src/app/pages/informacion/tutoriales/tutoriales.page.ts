import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VideoTutorialPage } from './video-tutorial/video-tutorial.page';

@Component({
  selector: 'app-tutoriales',
  templateUrl: './tutoriales.page.html',
  styleUrls: ['./tutoriales.page.scss'],
})
export class TutorialesPage implements OnInit {

  constructor(private modalController:ModalController) { }

  ngOnInit() {
  }

  async mostrarVideo(nombre:string){
    const modal = await this.modalController.create({
      component: VideoTutorialPage,
      componentProps: { nombre: nombre },
    });
    modal.onDidDismiss()
    .then(() => {
    this.ngOnInit()
   });
    return await modal.present()
   }

}
