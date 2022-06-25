import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'miLugar',
        loadChildren: () => import('../mi-lugar/mi-lugar.module').then(m => m.MiLugarPageModule)
      },
      {
        path: 'alumnos',
        loadChildren: () => import('../alumnos/alumnos.module').then(m => m.AlumnosPageModule),

      },
      {
        path: 'alumno',
        loadChildren: () => import('../alumnos/alumno/alumno.module').then(m => m.AlumnoPageModule),

      },
      {
        path: 'calendario',
        loadChildren: () => import('../calendario/calendario.module').then(m => m.CalendarioPageModule)
      },
      {
        path: 'comite-tecnico',
        loadChildren: () => import('../comite-tecnico/comite-tecnico.module').then(m => m.ComiteTecnicoPageModule)
      },
      {
        path: 'detalle-tecnico',
        loadChildren: () => import('../comite-tecnico/detalle-tecnico/detalle-tecnico.module').then(m => m.DetalleTecnicoPageModule)
      },
      {
        path: 'comportamiento',
        loadChildren: () => import('../comite-tecnico/comportamiento/comportamiento.module').then(m => m.ComportamientoPageModule)
      },
      {
        path: 'faltas',
        loadChildren: () => import('../faltas/faltas.module').then(m => m.FaltasPageModule)
      },
      {
        path: 'pago',
        loadChildren: () => import('../pago/pago.module').then(m => m.PagoPageModule)
      },
      {
        path: 'evaluaciones',
        loadChildren: () => import('../evaluaciones/evaluaciones.module').then(m => m.EvaluacionesPageModule)
      },
      {
        path: 'opinion-tutor',
        loadChildren: () => import('../comite-tecnico/opinion-tutor/opinion-tutor.module').then(m => m.OpinionTutorPageModule)
      },
      {
        path: 'opinion-entrenador',
        loadChildren: () => import('../comite-tecnico/opinion-entrenador/opinion-entrenador.module').then(m => m.OpinionEntrenadorPageModule)
      },
      {
        path: 'sugerencias',
        loadChildren: () => import('../comite-tecnico/sugerencias/sugerencias.module').then(m => m.SugerenciasPageModule)
      },
      {
        path: 'modifica-alumno',
        loadChildren: () => import('../alumnos/alumno/modifica-alumno/modifica-alumno.module').then(m => m.ModificaAlumnoPageModule)
      },
      {
        path: 'ejercicios',
        loadChildren: () => import('../ejercicios/ejercicios.module').then(m => m.EjerciciosPageModule)
      },
      {
        path: 'ejercicio',
        loadChildren: () => import('../ejercicios/ejercicio/ejercicio.module').then(m => m.EjercicioPageModule)
      },
      {
        path: 'grupos',
        loadChildren: () => import('../grupos/grupos.module').then(m => m.GruposPageModule)
      },
      {
        path: 'grupo-ejercicios',
        loadChildren: () => import('../grupo-ejercicios/grupo-ejercicios.module').then(m => m.GrupoEjerciciosPageModule)
      },
      {
        path: 'planificaciones',
        loadChildren: () => import('../planificaciones/planificaciones.module').then(m => m.PlanificacionesPageModule)
      },
      {
        path: 'trimestres',
        loadChildren: () => import('../planificaciones/trimestres/trimestres.module').then(m => m.TrimestresPageModule)
      },
      {
        path: 'semanas',
        loadChildren: () => import('../planificaciones/trimestres/semanas/semanas.module').then(m => m.SemanasPageModule)
      },
      {
        path: 'semana',
        loadChildren: () => import('../planificaciones/trimestres/semanas/semana/semana.module').then(m => m.SemanaPageModule)
      },
      {
        path: 'grupo',
        loadChildren: () => import('../grupos/grupo/grupo.module').then(m => m.GrupoPageModule)
      },
      {
        path: 'clases',
        loadChildren: () => import('../clases/clases.module').then(m => m.ClasesPageModule)
      },
      {
        path: 'clase',
        loadChildren: () => import('../clases/clase/clase.module').then(m => m.ClasePageModule)
      },
      {
        path: 'explora',
        loadChildren: () => import('../explora/explora.module').then( m => m.ExploraPageModule)
      },
      {
        path: 'grupo-video-libros',
        loadChildren: () => import('../explora/grupo-video-libros/grupo-video-libros.module').then( m => m.GrupoVideoLibrosPageModule)
      },
      {
        path: 'video-libro',
        loadChildren: () => import('../explora/grupo-video-libros/video-libro/video-libro.module').then( m => m.VideoLibroPageModule)
      },
      {
        path: 'tienda',
        loadChildren: () => import('../tienda/tienda.module').then( m => m.TiendaPageModule)
      },
      {
        path: 'ejercicios-explora',
        loadChildren: () => import('../explora/grupo-ejercicios-explora/ejercicios/ejercicios.module').then( m => m.EjerciciosPageModule)
      },
      {
        path: 'ejercicio-explora',
        loadChildren: () => import('../explora/grupo-ejercicios-explora/ejercicios/ejercicio/ejercicio.module').then( m => m.EjercicioPageModule)
      },
      {
        path: 'categorias-planificacion-explora',
        loadChildren: () => import('../explora/categorias-planificacion-explora/categorias-planificacion-explora.module').then( m => m.CategoriasPlanificacionExploraPageModule)
      },
      {
        path: 'trimestre-planificacion-explora',
        loadChildren: () => import('../explora/categorias-planificacion-explora/trimestres-planificacion-explora/trimestres-planificacion-explora.module').then( m => m.TrimestresPlanificacionExploraPageModule)
      },

      {
        path: 'semana-planificacion-explora',
        loadChildren: () => import('../explora/categorias-planificacion-explora/trimestres-planificacion-explora/semana-planificacion-explora/semana-planificacion-explora.module').then( m => m.SemanaPlanificacionExploraPageModule)
      },
      {
        path: 'edita-clase',
        loadChildren: () => import('../clases/clase/edita-clase/edita-clase.module').then( m => m.EditaClasePageModule)
      },
      {
        path: 'usuario',
        loadChildren: () => import('../usuario/usuario.module').then( m => m.UsuarioPageModule)
      },
      {
        path: 'informacion',
        loadChildren: () => import('../informacion/informacion.module').then( m => m.InformacionPageModule)
      },

      {
        path: 'profesores',
        loadChildren: () => import('../profesores/profesores.module').then( m => m.ProfesoresPageModule)
      },
      {
        path: 'profesor',
        loadChildren: () => import('../profesores/profesor/profesor.module').then( m => m.ProfesorPageModule)
      },

      
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
