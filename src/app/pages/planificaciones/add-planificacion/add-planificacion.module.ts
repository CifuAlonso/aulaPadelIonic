import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPlanificacionPageRoutingModule } from './add-planificacion-routing.module';

import { AddPlanificacionPage } from './add-planificacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPlanificacionPageRoutingModule
  ],
  declarations: [AddPlanificacionPage]
})
export class AddPlanificacionPageModule {}
