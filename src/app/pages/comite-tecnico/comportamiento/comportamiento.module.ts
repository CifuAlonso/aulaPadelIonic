import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComportamientoPageRoutingModule } from './comportamiento-routing.module';

import { ComportamientoPage } from './comportamiento.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComportamientoPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [ComportamientoPage]
})
export class ComportamientoPageModule {}
