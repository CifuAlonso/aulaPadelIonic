import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddProfesorPage } from './add-profesor.page';

const routes: Routes = [
  {
    path: '',
    component: AddProfesorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddProfesorPageRoutingModule {}
