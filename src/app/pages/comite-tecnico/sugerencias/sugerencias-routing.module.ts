import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SugerenciasPage } from './sugerencias.page';

const routes: Routes = [
  {
    path: '',
    component: SugerenciasPage
  },
  {
    path: 'add-sugerencia',
    loadChildren: () => import('./add-sugerencia/add-sugerencia.module').then( m => m.AddSugerenciaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SugerenciasPageRoutingModule {}
