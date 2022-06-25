import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddAlumnoGrupoPage } from '../../pages/grupos/grupo/add-alumno-grupo/add-alumno-grupo.page';

@Component({
  selector: 'app-popover-menu-grupo-alumnos',
  templateUrl: './popover-menu-grupo-alumnos.component.html',
  styleUrls: ['./popover-menu-grupo-alumnos.component.scss'],
})
export class PopoverMenuGrupoAlumnosComponent implements OnInit {

  constructor( 
    private modalController:ModalController) { }

  ngOnInit() {}

  async mostrarAddAlumnosGrupo(){
    const modal = await this.modalController.create({
      component: AddAlumnoGrupoPage,
    });
    modal.onDidDismiss()
    .then(() => {
    this.ngOnInit()
  });
    return await modal.present()
  }
}
