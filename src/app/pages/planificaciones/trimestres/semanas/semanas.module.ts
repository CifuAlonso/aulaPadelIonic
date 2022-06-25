import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SemanasPageRoutingModule } from './semanas-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { SemanasPage } from './semanas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    SemanasPageRoutingModule
  ],
  declarations: [SemanasPage]
})
export class SemanasPageModule {}
