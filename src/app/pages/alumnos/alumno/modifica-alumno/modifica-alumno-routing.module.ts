import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificaAlumnoPage } from './modifica-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: ModificaAlumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificaAlumnoPageRoutingModule {}
