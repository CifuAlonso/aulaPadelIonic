import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAlumnoClasePageRoutingModule } from './add-alumno-clase-routing.module';

import { AddAlumnoClasePage } from './add-alumno-clase.page';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    AddAlumnoClasePageRoutingModule
  ],
  declarations: [AddAlumnoClasePage]
})
export class AddAlumnoClasePageModule {}
