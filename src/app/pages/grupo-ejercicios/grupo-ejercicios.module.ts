import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrupoEjerciciosPageRoutingModule } from './grupo-ejercicios-routing.module';

import { GrupoEjerciciosPage } from './grupo-ejercicios.page';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    GrupoEjerciciosPageRoutingModule
  ],
  declarations: [GrupoEjerciciosPage]
})
export class GrupoEjerciciosPageModule {}
