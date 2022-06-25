import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarUsuarioPage } from './editar-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: EditarUsuarioPage
  },
  {
    path: 'password',
    loadChildren: () => import('./password/password.module').then( m => m.PasswordPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarUsuarioPageRoutingModule {}
