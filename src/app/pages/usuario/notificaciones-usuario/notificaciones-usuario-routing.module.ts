import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificacionesUsuarioPage } from './notificaciones-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: NotificacionesUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificacionesUsuarioPageRoutingModule {}
