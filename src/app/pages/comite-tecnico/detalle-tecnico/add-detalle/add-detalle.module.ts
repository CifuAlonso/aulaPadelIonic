import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDetallePageRoutingModule } from './add-detalle-routing.module';

import { AddDetallePage } from './add-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddDetallePageRoutingModule
  ],
  declarations: [AddDetallePage]
})
export class AddDetallePageModule {}
