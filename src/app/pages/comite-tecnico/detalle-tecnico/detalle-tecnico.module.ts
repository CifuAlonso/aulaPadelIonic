import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleTecnicoPageRoutingModule } from './detalle-tecnico-routing.module';

import { DetalleTecnicoPage } from './detalle-tecnico.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleTecnicoPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [DetalleTecnicoPage]
})
export class DetalleTecnicoPageModule {}
