import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LicenciaUsuarioPage } from './licencia-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: LicenciaUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LicenciaUsuarioPageRoutingModule {}
