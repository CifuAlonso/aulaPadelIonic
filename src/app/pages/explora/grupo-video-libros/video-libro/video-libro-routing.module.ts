import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoLibroPage } from './video-libro.page';

const routes: Routes = [
  {
    path: '',
    component: VideoLibroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoLibroPageRoutingModule {}
