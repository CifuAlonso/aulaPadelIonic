import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSemanaPage } from './add-semana.page';

const routes: Routes = [
  {
    path: '',
    component: AddSemanaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSemanaPageRoutingModule {}
