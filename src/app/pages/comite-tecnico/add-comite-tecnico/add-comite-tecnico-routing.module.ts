import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddComiteTecnicoPage } from './add-comite-tecnico.page';

const routes: Routes = [
  {
    path: '',
    component: AddComiteTecnicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddComiteTecnicoPageRoutingModule {}
