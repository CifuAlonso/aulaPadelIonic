import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAlumnoGrupoPageRoutingModule } from './add-alumno-grupo-routing.module';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AddAlumnoGrupoPage } from './add-alumno-grupo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    AddAlumnoGrupoPageRoutingModule
  ],
  declarations: [AddAlumnoGrupoPage]
})
export class AddAlumnoGrupoPageModule {}
