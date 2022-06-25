import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrupoPageRoutingModule } from './grupo-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { GrupoPage } from './grupo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    GrupoPageRoutingModule
  ],
  declarations: [GrupoPage]
})
export class GrupoPageModule {}
