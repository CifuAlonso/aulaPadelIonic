import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaltasPageRoutingModule } from './faltas-routing.module';

import { FaltasPage } from './faltas.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaltasPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [FaltasPage]
})
export class FaltasPageModule {}
