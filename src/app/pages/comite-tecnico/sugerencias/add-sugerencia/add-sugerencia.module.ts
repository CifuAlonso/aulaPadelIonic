import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSugerenciaPageRoutingModule } from './add-sugerencia-routing.module';

import { AddSugerenciaPage } from './add-sugerencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddSugerenciaPageRoutingModule
  ],
  declarations: [AddSugerenciaPage]
})
export class AddSugerenciaPageModule {}
