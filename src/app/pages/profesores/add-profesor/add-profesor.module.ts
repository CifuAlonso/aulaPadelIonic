import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddProfesorPageRoutingModule } from './add-profesor-routing.module';

import { AddProfesorPage } from './add-profesor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddProfesorPageRoutingModule
  ],
  declarations: [AddProfesorPage]
})
export class AddProfesorPageModule {}
