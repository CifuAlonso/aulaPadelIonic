import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrupoEjerciciosExploraPageRoutingModule } from './grupo-ejercicios-explora-routing.module';

import { GrupoEjerciciosExploraPage } from './grupo-ejercicios-explora.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrupoEjerciciosExploraPageRoutingModule
  ],
  declarations: [GrupoEjerciciosExploraPage]
})
export class GrupoEjerciciosExploraPageModule {}
