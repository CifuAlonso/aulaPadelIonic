import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoTutorialPage } from './video-tutorial.page';

const routes: Routes = [
  {
    path: '',
    component: VideoTutorialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoTutorialPageRoutingModule {}
