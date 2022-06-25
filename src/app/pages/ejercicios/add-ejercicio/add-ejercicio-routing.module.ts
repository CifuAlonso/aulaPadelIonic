import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEjercicioPage } from './add-ejercicio.page';

const routes: Routes = [
  {
    path: '',
    component: AddEjercicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEjercicioPageRoutingModule {}
