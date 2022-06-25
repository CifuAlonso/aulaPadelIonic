import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClasesPage } from './clases.page';

const routes: Routes = [
  {
    path: '',
    component: ClasesPage
  },
  {
    path: 'clase',
    loadChildren: () => import('./clase/clase.module').then( m => m.ClasePageModule)
  },
  {
    path: 'add-clase',
    loadChildren: () => import('./add-clase/add-clase.module').then( m => m.AddClasePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClasesPageRoutingModule {}
