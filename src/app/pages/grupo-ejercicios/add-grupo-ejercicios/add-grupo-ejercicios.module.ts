import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddGrupoEjerciciosPageRoutingModule } from './add-grupo-ejercicios-routing.module';

import { AddGrupoEjerciciosPage } from './add-grupo-ejercicios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddGrupoEjerciciosPageRoutingModule
  ],
  declarations: [AddGrupoEjerciciosPage]
})
export class AddGrupoEjerciciosPageModule {}
