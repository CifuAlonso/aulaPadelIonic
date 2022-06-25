import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDetallePage } from './add-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: AddDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDetallePageRoutingModule {}
