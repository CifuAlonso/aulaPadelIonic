import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEjercicioPageRoutingModule } from './add-ejercicio-routing.module';

import { AddEjercicioPage } from './add-ejercicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEjercicioPageRoutingModule
  ],
  declarations: [AddEjercicioPage]
})
export class AddEjercicioPageModule {}
