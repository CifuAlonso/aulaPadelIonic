import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiLugarPage } from './mi-lugar.page';

const routes: Routes = [
  {
    path: '',
    component: MiLugarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiLugarPageRoutingModule {}
