import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriasPlanificacionExploraPage } from './categorias-planificacion-explora.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriasPlanificacionExploraPage
  },
  {
    path: 'trimestres-planificacion-explora',
    loadChildren: () => import('./trimestres-planificacion-explora/trimestres-planificacion-explora.module').then( m => m.TrimestresPlanificacionExploraPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriasPlanificacionExploraPageRoutingModule {}
