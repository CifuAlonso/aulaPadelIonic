import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEjercicioSemanaPage } from './add-ejercicio-semana.page';

const routes: Routes = [
  {
    path: '',
    component: AddEjercicioSemanaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEjercicioSemanaPageRoutingModule {}
