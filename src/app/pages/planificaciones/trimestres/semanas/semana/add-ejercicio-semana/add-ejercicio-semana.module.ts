import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEjercicioSemanaPageRoutingModule } from './add-ejercicio-semana-routing.module';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AddEjercicioSemanaPage } from './add-ejercicio-semana.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    AddEjercicioSemanaPageRoutingModule
  ],
  declarations: [AddEjercicioSemanaPage]
})
export class AddEjercicioSemanaPageModule {}
