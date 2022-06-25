import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTrimestrePage } from './add-trimestre.page';

const routes: Routes = [
  {
    path: '',
    component: AddTrimestrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTrimestrePageRoutingModule {}
