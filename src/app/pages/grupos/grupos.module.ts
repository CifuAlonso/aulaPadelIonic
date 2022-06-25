import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GruposPageRoutingModule } from './grupos-routing.module';

import { GruposPage } from './grupos.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    GruposPageRoutingModule
  ],
  declarations: [GruposPage]
})
export class GruposPageModule {}
