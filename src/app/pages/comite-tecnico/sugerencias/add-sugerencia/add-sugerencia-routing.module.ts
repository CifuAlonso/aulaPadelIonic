import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSugerenciaPage } from './add-sugerencia.page';

const routes: Routes = [
  {
    path: '',
    component: AddSugerenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSugerenciaPageRoutingModule {}
