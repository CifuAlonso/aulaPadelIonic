import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddComportamientoPageRoutingModule } from './add-comportamiento-routing.module';

import { AddComportamientoPage } from './add-comportamiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddComportamientoPageRoutingModule
  ],
  declarations: [AddComportamientoPage]
})
export class AddComportamientoPageModule {}
