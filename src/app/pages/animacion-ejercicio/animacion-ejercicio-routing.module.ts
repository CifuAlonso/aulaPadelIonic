import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnimacionEjercicioPage } from './animacion-ejercicio.page';

const routes: Routes = [
  {
    path: '',
    component: AnimacionEjercicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimacionEjercicioPageRoutingModule {}
