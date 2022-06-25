import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriasPlanificacionExploraPageRoutingModule } from './categorias-planificacion-explora-routing.module';

import { CategoriasPlanificacionExploraPage } from './categorias-planificacion-explora.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriasPlanificacionExploraPageRoutingModule
  ],
  declarations: [CategoriasPlanificacionExploraPage]
})
export class CategoriasPlanificacionExploraPageModule {}
