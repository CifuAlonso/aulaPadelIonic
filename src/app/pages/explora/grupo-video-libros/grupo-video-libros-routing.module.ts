import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrupoVideoLibrosPage } from './grupo-video-libros.page';

const routes: Routes = [
  {
    path: '',
    component: GrupoVideoLibrosPage
  },

  {
    path: 'video-libro',
    loadChildren: () => import('./video-libro/video-libro.module').then( m => m.VideoLibroPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrupoVideoLibrosPageRoutingModule {}
