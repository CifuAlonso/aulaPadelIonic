import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { AddEjercicioSemanaPage } from '../../pages/planificaciones/trimestres/semanas/semana/add-ejercicio-semana/add-ejercicio-semana.page';

@Component({
  selector: 'app-popover-menu-semana-planificacion',
  templateUrl: './popover-menu-semana-planificacion.component.html',
  styleUrls: ['./popover-menu-semana-planificacion.component.scss'],
})
export class PopoverMenuSemanaPlanificacionComponent implements OnInit {
  @Input() mueveEjercicios: boolean
  constructor( private popoverController:PopoverController,
    private modalController:ModalController,) { 
 
  }

  ngOnInit() {}

  mueve() {
    this.mueveEjercicios=false;
    this.popoverController.dismiss(this.mueveEjercicios);
  }

  async mostrarAddEjercicioSemana(){
    const modal = await this.modalController.create({
      component: AddEjercicioSemanaPage,
    });
    modal.onDidDismiss()
    .then(() => {
    this.ngOnInit()
  });
    return await modal.present()
  }
  

  

  

}
