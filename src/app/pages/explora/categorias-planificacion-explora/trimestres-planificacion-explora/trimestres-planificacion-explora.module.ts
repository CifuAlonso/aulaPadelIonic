import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrimestresPlanificacionExploraPageRoutingModule } from './trimestres-planificacion-explora-routing.module';

import { TrimestresPlanificacionExploraPage } from './trimestres-planificacion-explora.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrimestresPlanificacionExploraPageRoutingModule
  ],
  declarations: [TrimestresPlanificacionExploraPage]
})
export class TrimestresPlanificacionExploraPageModule {}
