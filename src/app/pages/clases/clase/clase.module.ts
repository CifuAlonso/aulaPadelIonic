import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClasePageRoutingModule } from './clase-routing.module';
import { StarRatingModule } from 'ionic5-star-rating';

import { ClasePage } from './clase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StarRatingModule,
    ClasePageRoutingModule
  ],
  declarations: [ClasePage]
})
export class ClasePageModule {}
