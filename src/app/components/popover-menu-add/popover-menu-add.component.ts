import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { AddPlanificacionPage } from 'src/app/pages/planificaciones/add-planificacion/add-planificacion.page';
import { AddAlumnoPage } from '../../pages/alumnos/add-alumno/add-alumno.page';
import { AddEjercicioPage } from '../../pages/ejercicios/add-ejercicio/add-ejercicio.page';
import { EjercicioService } from '../../services/ejercicio.service';
import { AddClasePage } from '../../pages/clases/add-clase/add-clase.page';
import { AddGrupoPage } from '../../pages/grupos/add-grupo/add-grupo.page';
import { Usuario } from 'src/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AddProfesorPage } from '../../pages/profesores/add-profesor/add-profesor.page';

@Component({
  selector: 'app-popover-menu-add',
  templateUrl: './popover-menu-add.component.html',
  styleUrls: ['./popover-menu-add.component.scss'],
})
export class PopoverMenuAddComponent implements OnInit {
  usuario: Usuario={};

  constructor(
    private usuarioService:UsuarioService,
    private modalController:ModalController,
     private ejercicioService:EjercicioService,
     private popoverController:PopoverController) { }

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
  }

  async mostrarAddAlumno(){
    const modal = await this.modalController.create({
      component: AddAlumnoPage,
    });
    await this.popoverController.dismiss();
    return await modal.present();
  }

  
  async mostrarAddEjercicio(){
    this.ejercicioService.deleteEjercicioIdActual();
    const modal = await this.modalController.create({
      component: AddEjercicioPage,

    });
    await this.popoverController.dismiss();
    return await modal.present();
  }

  
async mostrarAddPlanificacion(){
  const modal = await this.modalController.create({
    component: AddPlanificacionPage,
  });
  modal.onDidDismiss()
  .then(() => {
  this.ngOnInit()
 });
 await this.popoverController.dismiss();
  return await modal.present()
 }

 async mostrarAddClase(){
  const modal = await this.modalController.create({
    component: AddClasePage,
  });
  modal.onDidDismiss()
  .then(() => {
  this.ngOnInit()
 });
 await this.popoverController.dismiss();
  return await modal.present()
 }

 async mostrarAddGrupo(){
  const modal = await this.modalController.create({
    component: AddGrupoPage,
    componentProps: { usuario: this.usuario },
  });
  modal.onDidDismiss()
  .then(() => {
  this.ngOnInit()
 });
 await this.popoverController.dismiss();
  return await modal.present()
 }

 
 async mostrarAddProfesor(){
  const modal = await this.modalController.create({
    component: AddProfesorPage,
    componentProps: { usuario: this.usuario },
  });
  modal.onDidDismiss()
  .then(() => {
  this.ngOnInit()
 });
 await this.popoverController.dismiss();
  return await modal.present()
 }


}
