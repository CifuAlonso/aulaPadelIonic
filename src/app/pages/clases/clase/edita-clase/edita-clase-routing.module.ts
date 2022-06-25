import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditaClasePage } from './edita-clase.page';

const routes: Routes = [
  {
    path: '',
    component: EditaClasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditaClasePageRoutingModule {}
