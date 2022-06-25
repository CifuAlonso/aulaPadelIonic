import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificaAlumnoPageRoutingModule } from './modifica-alumno-routing.module';

import { ModificaAlumnoPage } from './modifica-alumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificaAlumnoPageRoutingModule
  ],
  declarations: [ModificaAlumnoPage]
})
export class ModificaAlumnoPageModule {}
