import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EjerciciosPage } from './ejercicios.page';

const routes: Routes = [
  {
    path: '',
    component: EjerciciosPage
  },
  {
    path: 'add-ejercicio',
    loadChildren: () => import('./add-ejercicio/add-ejercicio.module').then( m => m.AddEjercicioPageModule)
  },
  {
    path: 'ejercicio',
    loadChildren: () => import('./ejercicio/ejercicio.module').then( m => m.EjercicioPageModule)
  },
  {
    path: 'add-ejercicios-a-grupo',
    loadChildren: () => import('./add-ejercicios-a-grupo/add-ejercicios-a-grupo.module').then( m => m.AddEjerciciosAGrupoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EjerciciosPageRoutingModule {}
