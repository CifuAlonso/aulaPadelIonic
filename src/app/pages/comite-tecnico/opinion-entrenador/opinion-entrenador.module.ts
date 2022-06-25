import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpinionEntrenadorPageRoutingModule } from './opinion-entrenador-routing.module';

import { OpinionEntrenadorPage } from './opinion-entrenador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpinionEntrenadorPageRoutingModule
  ],
  declarations: [OpinionEntrenadorPage]
})
export class OpinionEntrenadorPageModule {}
