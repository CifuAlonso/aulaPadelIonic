import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComitePdfPageRoutingModule } from './comite-pdf-routing.module';

import { ComitePdfPage } from './comite-pdf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComitePdfPageRoutingModule
  ],
  declarations: [ComitePdfPage]
})
export class ComitePdfPageModule {}
