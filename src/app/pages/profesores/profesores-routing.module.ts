import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfesoresPage } from './profesores.page';

const routes: Routes = [
  {
    path: '',
    component: ProfesoresPage
  },
  {
    path: 'profesor',
    loadChildren: () => import('./profesor/profesor.module').then( m => m.ProfesorPageModule)
  },
  {
    path: 'add-profesor',
    loadChildren: () => import('./add-profesor/add-profesor.module').then( m => m.AddProfesorPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesoresPageRoutingModule {}
