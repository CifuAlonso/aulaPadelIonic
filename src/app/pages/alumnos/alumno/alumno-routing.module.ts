import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlumnoPage } from './alumno.page';

const routes: Routes = [
  {
    path: '',
    component: AlumnoPage
  },
  {
    path: 'modifica-alumno',
    loadChildren: () => import('./modifica-alumno/modifica-alumno.module').then( m => m.ModificaAlumnoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnoPageRoutingModule {}
