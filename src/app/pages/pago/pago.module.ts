import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagoPageRoutingModule } from './pago-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PagoPage } from './pago.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagoPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [PagoPage]
})
export class PagoPageModule {}
