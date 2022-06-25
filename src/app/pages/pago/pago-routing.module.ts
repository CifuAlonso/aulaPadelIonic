import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagoPage } from './pago.page';

const routes: Routes = [
  {
    path: '',
    component: PagoPage
  },
  {
    path: 'add-pago',
    loadChildren: () => import('./add-pago/add-pago.module').then( m => m.AddPagoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagoPageRoutingModule {}
