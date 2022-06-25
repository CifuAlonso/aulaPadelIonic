import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SemanaPlanificacionExploraPageRoutingModule } from './semana-planificacion-explora-routing.module';

import { SemanaPlanificacionExploraPage } from './semana-planificacion-explora.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SemanaPlanificacionExploraPageRoutingModule
  ],
  declarations: [SemanaPlanificacionExploraPage]
})
export class SemanaPlanificacionExploraPageModule {}
