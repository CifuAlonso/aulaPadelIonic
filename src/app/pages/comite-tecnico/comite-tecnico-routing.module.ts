import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComiteTecnicoPage } from './comite-tecnico.page';

const routes: Routes = [
  {
    path: '',
    component: ComiteTecnicoPage
  },
  {
    path: 'detalle-tecnico',
    loadChildren: () => import('./detalle-tecnico/detalle-tecnico.module').then( m => m.DetalleTecnicoPageModule)
  },
  {
    path: 'comportamiento',
    loadChildren: () => import('./comportamiento/comportamiento.module').then( m => m.ComportamientoPageModule)
  },
  {
    path: 'add-comite-tecnico',
    loadChildren: () => import('./add-comite-tecnico/add-comite-tecnico.module').then( m => m.AddComiteTecnicoPageModule)
  },
  {
    path: 'opinion-tutor',
    loadChildren: () => import('./opinion-tutor/opinion-tutor.module').then( m => m.OpinionTutorPageModule)
  },
  {
    path: 'opinion-entrenador',
    loadChildren: () => import('./opinion-entrenador/opinion-entrenador.module').then( m => m.OpinionEntrenadorPageModule)
  },
  {
    path: 'sugerencias',
    loadChildren: () => import('./sugerencias/sugerencias.module').then( m => m.SugerenciasPageModule)
  },
  {
    path: 'comite-pdf',
    loadChildren: () => import('./comite-pdf/comite-pdf.module').then( m => m.ComitePdfPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComiteTecnicoPageRoutingModule {}
