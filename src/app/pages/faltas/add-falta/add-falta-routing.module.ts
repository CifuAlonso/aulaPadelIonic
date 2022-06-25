import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFaltaPage } from './add-falta.page';

const routes: Routes = [
  {
    path: '',
    component: AddFaltaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFaltaPageRoutingModule {}
