import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrimestresPage } from './trimestres.page';

const routes: Routes = [
  {
    path: '',
    component: TrimestresPage
  },
  {
    path: 'add-trimestre',
    loadChildren: () => import('./add-trimestre/add-trimestre.module').then( m => m.AddTrimestrePageModule)
  },
  {
    path: 'semanas',
    loadChildren: () => import('./semanas/semanas.module').then( m => m.SemanasPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrimestresPageRoutingModule {}
