import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanificacionesPage } from './planificaciones.page';

const routes: Routes = [
  {
    path: '',
    component: PlanificacionesPage
  },
  {
    path: 'add-planificacion',
    loadChildren: () => import('./add-planificacion/add-planificacion.module').then( m => m.AddPlanificacionPageModule)
  },
  {
    path: 'trimestres',
    loadChildren: () => import('./trimestres/trimestres.module').then( m => m.TrimestresPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanificacionesPageRoutingModule {}
