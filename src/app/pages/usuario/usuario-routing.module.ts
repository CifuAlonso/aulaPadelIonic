import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioPage } from './usuario.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioPage
  },
  {
    path: 'editar-usuario',
    loadChildren: () => import('./editar-usuario/editar-usuario.module').then( m => m.EditarUsuarioPageModule)
  },
  {
    path: 'notificaciones-usuario',
    loadChildren: () => import('./notificaciones-usuario/notificaciones-usuario.module').then( m => m.NotificacionesUsuarioPageModule)
  },
  {
    path: 'idioma-usuario',
    loadChildren: () => import('./idioma-usuario/idioma-usuario.module').then( m => m.IdiomaUsuarioPageModule)
  },
  {
    path: 'licencia-usuario',
    loadChildren: () => import('./licencia-usuario/licencia-usuario.module').then( m => m.LicenciaUsuarioPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioPageRoutingModule {}
