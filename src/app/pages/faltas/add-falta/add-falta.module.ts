import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFaltaPageRoutingModule } from './add-falta-routing.module';

import { AddFaltaPage } from './add-falta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddFaltaPageRoutingModule
  ],
  declarations: [AddFaltaPage]
})
export class AddFaltaPageModule {}
