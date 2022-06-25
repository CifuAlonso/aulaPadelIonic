import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-explora',
  templateUrl: './explora.page.html',
  styleUrls: ['./explora.page.scss'],
})
export class ExploraPage implements OnInit {

  constructor(private navCtrl:NavController) { }

  ngOnInit() {
  }

  goToGrupoVideoLibros(){
    this.navCtrl.navigateRoot( 'main/tabs/grupo-video-libros', { animated:true})

  }

  goToEjercicios(){
    this.navCtrl.navigateRoot( 'main/tabs/ejercicios-explora', { animated:true})

  }

  goToPlanificaciones(){
    this.navCtrl.navigateRoot( 'main/tabs/categorias-planificacion-explora', { animated:true})
  }

}
