import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiLugarPageRoutingModule } from './mi-lugar-routing.module';

import { MiLugarPage } from './mi-lugar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiLugarPageRoutingModule
  ],
  declarations: [MiLugarPage]
})
export class MiLugarPageModule {}
