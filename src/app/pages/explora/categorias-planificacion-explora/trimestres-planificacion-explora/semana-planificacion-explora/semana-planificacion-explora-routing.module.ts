import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SemanaPlanificacionExploraPage } from './semana-planificacion-explora.page';

const routes: Routes = [
  {
    path: '',
    component: SemanaPlanificacionExploraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SemanaPlanificacionExploraPageRoutingModule {}
