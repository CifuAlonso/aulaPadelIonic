import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddComiteTecnicoPageRoutingModule } from './add-comite-tecnico-routing.module';

import { AddComiteTecnicoPage } from './add-comite-tecnico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddComiteTecnicoPageRoutingModule
  ],
  declarations: [AddComiteTecnicoPage]
})
export class AddComiteTecnicoPageModule {}
