import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlumnosPage } from './alumnos.page';

const routes: Routes = [
  {
    path: '',
    component: AlumnosPage
  },
  {
    path: 'alumno',
    loadChildren: () => import('./alumno/alumno.module').then( m => m.AlumnoPageModule)
  },
  {
    path: 'add-alumno',
    loadChildren: () => import('./add-alumno/add-alumno.module').then( m => m.AddAlumnoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnosPageRoutingModule {}
