import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddGrupoEjerciciosPage } from './add-grupo-ejercicios.page';

const routes: Routes = [
  {
    path: '',
    component: AddGrupoEjerciciosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddGrupoEjerciciosPageRoutingModule {}
