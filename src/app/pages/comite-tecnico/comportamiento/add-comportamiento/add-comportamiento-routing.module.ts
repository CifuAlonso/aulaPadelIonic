import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddComportamientoPage } from './add-comportamiento.page';

const routes: Routes = [
  {
    path: '',
    component: AddComportamientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddComportamientoPageRoutingModule {}
