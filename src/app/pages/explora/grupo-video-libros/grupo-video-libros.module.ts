import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrupoVideoLibrosPageRoutingModule } from './grupo-video-libros-routing.module';

import { GrupoVideoLibrosPage } from './grupo-video-libros.page';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    GrupoVideoLibrosPageRoutingModule
  ],
  declarations: [GrupoVideoLibrosPage]
})
export class GrupoVideoLibrosPageModule {}
