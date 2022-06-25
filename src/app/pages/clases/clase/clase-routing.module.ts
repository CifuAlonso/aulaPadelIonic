import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClasePage } from './clase.page';

const routes: Routes = [
  {
    path: '',
    component: ClasePage
  },
  {
    path: 'add-alumno-clase',
    loadChildren: () => import('./add-alumno-clase/add-alumno-clase.module').then( m => m.AddAlumnoClasePageModule)
  },
  {
    path: 'edita-clase',
    loadChildren: () => import('./edita-clase/edita-clase.module').then( m => m.EditaClasePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClasePageRoutingModule {}
