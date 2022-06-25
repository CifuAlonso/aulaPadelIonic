import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TutorialesPage } from './tutoriales.page';

const routes: Routes = [
  {
    path: '',
    component: TutorialesPage
  },
  {
    path: 'video-tutorial',
    loadChildren: () => import('./video-tutorial/video-tutorial.module').then( m => m.VideoTutorialPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorialesPageRoutingModule {}
