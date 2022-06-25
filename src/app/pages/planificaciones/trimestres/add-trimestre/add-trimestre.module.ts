import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTrimestrePageRoutingModule } from './add-trimestre-routing.module';

import { AddTrimestrePage } from './add-trimestre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTrimestrePageRoutingModule
  ],
  declarations: [AddTrimestrePage]
})
export class AddTrimestrePageModule {}
