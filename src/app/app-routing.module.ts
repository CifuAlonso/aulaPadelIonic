import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule),
    canLoad: [ UsuarioGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'addAlumno',
    loadChildren: () => import('./pages/alumnos/add-alumno/add-alumno.module').then( m => m.AddAlumnoPageModule)
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo:'login'
  },
  {
    path: 'calendario',
    loadChildren: () => import('./pages/calendario/calendario.module').then( m => m.CalendarioPageModule)
  },
  {
    path: 'tipo-usuario',
    loadChildren: () => import('./pages/tipo-usuario/tipo-usuario.module').then( m => m.TipoUsuarioPageModule)
  },
  {
    path: 'comite-tecnico',
    loadChildren: () => import('./pages/comite-tecnico/comite-tecnico.module').then( m => m.ComiteTecnicoPageModule)
  },
  {
    path: 'faltas',
    loadChildren: () => import('./pages/faltas/faltas.module').then( m => m.FaltasPageModule)
  },
  {
    path: 'pago',
    loadChildren: () => import('./pages/pago/pago.module').then( m => m.PagoPageModule)
  },
  {
    path: 'evaluaciones',
    loadChildren: () => import('./pages/evaluaciones/evaluaciones.module').then( m => m.EvaluacionesPageModule)
  },
  {
    path: 'mi-lugar',
    loadChildren: () => import('./pages/mi-lugar/mi-lugar.module').then( m => m.MiLugarPageModule)
  },
  {
    path: 'ejercicios',
    loadChildren: () => import('./pages/ejercicios/ejercicios.module').then( m => m.EjerciciosPageModule)
  },
  {
    path: 'animacion-ejercicio',
    loadChildren: () => import('./pages/animacion-ejercicio/animacion-ejercicio.module').then( m => m.AnimacionEjercicioPageModule)
  },
  {
    path: 'grupos',
    loadChildren: () => import('./pages/grupos/grupos.module').then( m => m.GruposPageModule)
  },
  {
    path: 'grupo-ejercicios',
    loadChildren: () => import('./pages/grupo-ejercicios/grupo-ejercicios.module').then( m => m.GrupoEjerciciosPageModule)
  },
  {
    path: 'planificaciones',
    loadChildren: () => import('./pages/planificaciones/planificaciones.module').then( m => m.PlanificacionesPageModule)
  },
  {
    path: 'clases',
    loadChildren: () => import('./pages/clases/clases.module').then( m => m.ClasesPageModule)
  },
  {
    path: 'explora',
    loadChildren: () => import('./pages/explora/explora.module').then( m => m.ExploraPageModule)
  },
  {
    path: 'tienda',
    loadChildren: () => import('./pages/tienda/tienda.module').then( m => m.TiendaPageModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./pages/usuario/usuario.module').then( m => m.UsuarioPageModule)
  },
  {
    path: 'components',
    loadChildren: () => import('../app/components/components.module').then( m => m.ComponentsModule)
},
  {
    path: 'informacion',
    loadChildren: () => import('./pages/informacion/informacion.module').then( m => m.InformacionPageModule)
  },
  {
    path: 'profesores',
    loadChildren: () => import('./pages/profesores/profesores.module').then( m => m.ProfesoresPageModule)
  },




 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
