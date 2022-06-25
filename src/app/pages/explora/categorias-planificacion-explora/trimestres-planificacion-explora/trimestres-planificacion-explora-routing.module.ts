import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrimestresPlanificacionExploraPage } from './trimestres-planificacion-explora.page';

const routes: Routes = [
  {
    path: '',
    component: TrimestresPlanificacionExploraPage
  },
  {
    path: 'semana-planificacion-explora',
    loadChildren: () => import('./semana-planificacion-explora/semana-planificacion-explora.module').then( m => m.SemanaPlanificacionExploraPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrimestresPlanificacionExploraPageRoutingModule {}
