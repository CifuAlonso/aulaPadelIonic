import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdiomaUsuarioPageRoutingModule } from './idioma-usuario-routing.module';

import { IdiomaUsuarioPage } from './idioma-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IdiomaUsuarioPageRoutingModule
  ],
  declarations: [IdiomaUsuarioPage]
})
export class IdiomaUsuarioPageModule {}
