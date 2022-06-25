import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditaClasePageRoutingModule } from './edita-clase-routing.module';

import { EditaClasePage } from './edita-clase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditaClasePageRoutingModule
  ],
  declarations: [EditaClasePage]
})
export class EditaClasePageModule {}
