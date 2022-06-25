import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClasesPageRoutingModule } from './clases-routing.module';
import { StarRatingModule } from 'ionic5-star-rating';
import { ClasesPage } from './clases.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClasesPageRoutingModule,
    StarRatingModule

  ],
  declarations: [ClasesPage]
})
export class ClasesPageModule {}
