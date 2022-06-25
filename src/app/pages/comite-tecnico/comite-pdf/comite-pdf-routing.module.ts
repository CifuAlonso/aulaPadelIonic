import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComitePdfPage } from './comite-pdf.page';

const routes: Routes = [
  {
    path: '',
    component: ComitePdfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComitePdfPageRoutingModule {}
