import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrimestresPageRoutingModule } from './trimestres-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TrimestresPage } from './trimestres.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    TrimestresPageRoutingModule
  ],
  declarations: [TrimestresPage]
})
export class TrimestresPageModule {}
