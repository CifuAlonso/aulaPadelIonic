import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpinionTutorPage } from './opinion-tutor.page';

const routes: Routes = [
  {
    path: '',
    component: OpinionTutorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpinionTutorPageRoutingModule {}
