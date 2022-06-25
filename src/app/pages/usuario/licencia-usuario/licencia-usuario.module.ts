import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LicenciaUsuarioPageRoutingModule } from './licencia-usuario-routing.module';

import { LicenciaUsuarioPage } from './licencia-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LicenciaUsuarioPageRoutingModule
  ],
  declarations: [LicenciaUsuarioPage]
})
export class LicenciaUsuarioPageModule {}
