import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SemanaPage } from './semana.page';

const routes: Routes = [
  {
    path: '',
    component: SemanaPage
  },
  {
    path: 'add-ejercicio-semana',
    loadChildren: () => import('./add-ejercicio-semana/add-ejercicio-semana.module').then( m => m.AddEjercicioSemanaPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SemanaPageRoutingModule {}
