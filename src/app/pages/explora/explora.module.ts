import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExploraPageRoutingModule } from './explora-routing.module';

import { ExploraPage } from './explora.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploraPageRoutingModule
  ],
  declarations: [ExploraPage]
})
export class ExploraPageModule {}
