import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEjerciciosAGrupoPage } from './add-ejercicios-a-grupo.page';

const routes: Routes = [
  {
    path: '',
    component: AddEjerciciosAGrupoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEjerciciosAGrupoPageRoutingModule {}
