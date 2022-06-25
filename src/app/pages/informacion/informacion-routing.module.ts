import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformacionPage } from './informacion.page';

const routes: Routes = [
  {
    path: '',
    component: InformacionPage
  },
  {
    path: 'condiciones',
    loadChildren: () => import('./condiciones/condiciones.module').then( m => m.CondicionesPageModule)
  },
  {
    path: 'privacidad',
    loadChildren: () => import('./privacidad/privacidad.module').then( m => m.PrivacidadPageModule)
  },
  {
    path: 'tutoriales',
    loadChildren: () => import('./tutoriales/tutoriales.module').then( m => m.TutorialesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformacionPageRoutingModule {}
