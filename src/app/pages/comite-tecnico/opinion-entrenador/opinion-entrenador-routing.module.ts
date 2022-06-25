import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpinionEntrenadorPage } from './opinion-entrenador.page';

const routes: Routes = [
  {
    path: '',
    component: OpinionEntrenadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpinionEntrenadorPageRoutingModule {}
