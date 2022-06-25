import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdiomaUsuarioPage } from './idioma-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: IdiomaUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdiomaUsuarioPageRoutingModule {}
