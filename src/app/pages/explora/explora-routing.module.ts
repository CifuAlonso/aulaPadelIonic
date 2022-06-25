import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExploraPage } from './explora.page';

const routes: Routes = [
  {
    path: '',
    component: ExploraPage
  },
  {
    path: 'grupo-video-libros',
    loadChildren: () => import('./grupo-video-libros/grupo-video-libros.module').then( m => m.GrupoVideoLibrosPageModule)
  },
  {
    path: 'grupo-ejercicios-explora',
    loadChildren: () => import('./grupo-ejercicios-explora/grupo-ejercicios-explora.module').then( m => m.GrupoEjerciciosExploraPageModule)
  },
  {
    path: 'categorias-planificacion-explora',
    loadChildren: () => import('./categorias-planificacion-explora/categorias-planificacion-explora.module').then( m => m.CategoriasPlanificacionExploraPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExploraPageRoutingModule {}
