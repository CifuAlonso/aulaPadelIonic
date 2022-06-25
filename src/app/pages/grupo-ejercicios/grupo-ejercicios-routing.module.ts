import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrupoEjerciciosPage } from './grupo-ejercicios.page';

const routes: Routes = [
  {
    path: '',
    component: GrupoEjerciciosPage
  },
  {
    path: 'add-grupo-ejercicios',
    loadChildren: () => import('./add-grupo-ejercicios/add-grupo-ejercicios.module').then( m => m.AddGrupoEjerciciosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrupoEjerciciosPageRoutingModule {}
