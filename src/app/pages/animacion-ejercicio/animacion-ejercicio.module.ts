import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnimacionEjercicioPageRoutingModule } from './animacion-ejercicio-routing.module';

import { AnimacionEjercicioPage } from './animacion-ejercicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnimacionEjercicioPageRoutingModule
  ],
  declarations: [AnimacionEjercicioPage]
})
export class AnimacionEjercicioPageModule {}
