import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPlanificacionPage } from './add-planificacion.page';

const routes: Routes = [
  {
    path: '',
    component: AddPlanificacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPlanificacionPageRoutingModule {}
