import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAlumnoGrupoPage } from './add-alumno-grupo.page';

const routes: Routes = [
  {
    path: '',
    component: AddAlumnoGrupoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAlumnoGrupoPageRoutingModule {}
