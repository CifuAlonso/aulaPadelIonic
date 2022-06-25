import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAlumnoClasePage } from './add-alumno-clase.page';

const routes: Routes = [
  {
    path: '',
    component: AddAlumnoClasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAlumnoClasePageRoutingModule {}
