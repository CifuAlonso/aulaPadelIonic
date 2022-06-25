import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SemanaPageRoutingModule } from './semana-routing.module';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { SemanaPage } from './semana.page';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    SemanaPageRoutingModule,
    DragDropModule
  ],
  declarations: [SemanaPage]
})
export class SemanaPageModule {}
