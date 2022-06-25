import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvaluacionesPageRoutingModule } from './evaluaciones-routing.module';

import { EvaluacionesPage } from './evaluaciones.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvaluacionesPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [EvaluacionesPage]
})
export class EvaluacionesPageModule {}
