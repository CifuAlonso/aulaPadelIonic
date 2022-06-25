import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificacionesUsuarioPageRoutingModule } from './notificaciones-usuario-routing.module';

import { NotificacionesUsuarioPage } from './notificaciones-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificacionesUsuarioPageRoutingModule
  ],
  declarations: [NotificacionesUsuarioPage]
})
export class NotificacionesUsuarioPageModule {}
