import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSemanaPageRoutingModule } from './add-semana-routing.module';

import { AddSemanaPage } from './add-semana.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddSemanaPageRoutingModule
  ],
  declarations: [AddSemanaPage]
})
export class AddSemanaPageModule {}
