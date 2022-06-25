import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleTecnicoPage } from './detalle-tecnico.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleTecnicoPage
  },
  {
    path: 'add-detalle',
    loadChildren: () => import('./add-detalle/add-detalle.module').then( m => m.AddDetallePageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleTecnicoPageRoutingModule {}
