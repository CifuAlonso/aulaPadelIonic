import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanificacionesPageRoutingModule } from './planificaciones-routing.module';

import { PlanificacionesPage } from './planificaciones.page';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    PlanificacionesPageRoutingModule,
    DragDropModule,
  ],
  declarations: [PlanificacionesPage]
})
export class PlanificacionesPageModule {}
