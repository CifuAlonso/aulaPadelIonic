import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SemanasPage } from './semanas.page';

const routes: Routes = [
  {
    path: '',
    component: SemanasPage
  },
  {
    path: 'add-semana',
    loadChildren: () => import('./add-semana/add-semana.module').then( m => m.AddSemanaPageModule)
  },
  {
    path: 'semana',
    loadChildren: () => import('./semana/semana.module').then( m => m.SemanaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SemanasPageRoutingModule {}
