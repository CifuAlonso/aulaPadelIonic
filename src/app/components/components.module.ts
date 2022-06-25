import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PopoverMenuAddComponent } from './popover-menu-add/popover-menu-add.component';
import { PopoverDetalleTecnicoComponent } from './popover-detalle-tecnico/popover-detalle-tecnico.component';
import { PopoverComportamientoComponent } from './popover-comportamiento/popover-comportamiento.component';
import { PopoverAusenciaComponent } from './popover-ausencia/popover-ausencia.component';
import { PopoverPagoComponent } from './popover-pago/popover-pago.component';
import { PopoverMenuAlumnoComponent } from './popover-menu-alumno/popover-menu-alumno.component';
import { PopoverMenuSemanaPlanificacionComponent } from './popover-menu-semana-planificacion/popover-menu-semana-planificacion.component';
import { PopoverCambiaPasswordComponent } from './popover-cambia-password/popover-cambia-password.component';
import { PopoverFotoAlumnoComponent } from './popover-foto-alumno/popover-foto-alumno.component';
import { PopoverFotoComponent } from './popover-foto/popover-foto.component';
import { PopoverMenuClaseComponent } from './popover-menu-clase/popover-menu-clase.component';
import { PopoverVerPerfilComponent } from './popover-ver-perfil/popover-ver-perfil.component';
import { PopoverMenuGrupoAlumnosComponent } from './popover-menu-grupo-alumnos/popover-menu-grupo-alumnos.component';



@NgModule({
  declarations: [
    PopoverMenuAddComponent,
    PopoverDetalleTecnicoComponent,
    PopoverComportamientoComponent,
    PopoverAusenciaComponent,
    PopoverPagoComponent,
    PopoverMenuAlumnoComponent,
    PopoverMenuSemanaPlanificacionComponent,
    PopoverCambiaPasswordComponent,
    PopoverFotoAlumnoComponent,
    PopoverFotoComponent,
    PopoverMenuClaseComponent,
    PopoverPagoComponent,
    PopoverVerPerfilComponent,
    PopoverMenuGrupoAlumnosComponent
  ],
  exports: [
    PopoverMenuAddComponent,
    PopoverDetalleTecnicoComponent,
    PopoverComportamientoComponent,
    PopoverAusenciaComponent,
    PopoverPagoComponent,
    PopoverMenuAlumnoComponent,
    PopoverMenuSemanaPlanificacionComponent,
    PopoverCambiaPasswordComponent,
    PopoverFotoAlumnoComponent,
    PopoverFotoComponent,
    PopoverMenuClaseComponent,
    PopoverPagoComponent,
    PopoverVerPerfilComponent,
    PopoverMenuGrupoAlumnosComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot()
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class ComponentsModule { }
