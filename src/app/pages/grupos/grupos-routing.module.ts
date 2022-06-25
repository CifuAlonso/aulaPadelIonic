import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GruposPage } from './grupos.page';

const routes: Routes = [
  {
    path: '',
    component: GruposPage
  },
  {
    path: 'add-grupo',
    loadChildren: () => import('./add-grupo/add-grupo.module').then( m => m.AddGrupoPageModule)
  },
  {
    path: 'grupo',
    loadChildren: () => import('./grupo/grupo.module').then( m => m.GrupoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GruposPageRoutingModule {}
