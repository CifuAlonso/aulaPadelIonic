import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEjerciciosAGrupoPageRoutingModule } from './add-ejercicios-a-grupo-routing.module';

import { AddEjerciciosAGrupoPage } from './add-ejercicios-a-grupo.page';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    AddEjerciciosAGrupoPageRoutingModule
  ],
  declarations: [AddEjerciciosAGrupoPage]
})
export class AddEjerciciosAGrupoPageModule {}
