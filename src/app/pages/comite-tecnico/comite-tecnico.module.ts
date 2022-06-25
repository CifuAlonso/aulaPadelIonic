import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComiteTecnicoPageRoutingModule } from './comite-tecnico-routing.module';

import { ComiteTecnicoPage } from './comite-tecnico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComiteTecnicoPageRoutingModule
  ],
  declarations: [ComiteTecnicoPage]
})
export class ComiteTecnicoPageModule {}
