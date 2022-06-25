import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrupoEjerciciosExploraPage } from './grupo-ejercicios-explora.page';

const routes: Routes = [
  {
    path: '',
    component: GrupoEjerciciosExploraPage
  },
  {
    path: 'ejercicios',
    loadChildren: () => import('./ejercicios/ejercicios.module').then( m => m.EjerciciosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrupoEjerciciosExploraPageRoutingModule {}
