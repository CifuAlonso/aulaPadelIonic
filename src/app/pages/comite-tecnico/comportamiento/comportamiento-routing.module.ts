import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComportamientoPage } from './comportamiento.page';

const routes: Routes = [
  {
    path: '',
    component: ComportamientoPage
  },
  {
    path: 'add-comportamiento',
    loadChildren: () => import('./add-comportamiento/add-comportamiento.module').then( m => m.AddComportamientoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComportamientoPageRoutingModule {}
