import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrupoPage } from './grupo.page';

const routes: Routes = [
  {
    path: '',
    component: GrupoPage
  },
  {
    path: 'add-alumno-grupo',
    loadChildren: () => import('./add-alumno-grupo/add-alumno-grupo.module').then( m => m.AddAlumnoGrupoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrupoPageRoutingModule {}
