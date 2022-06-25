import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgCalendarModule  } from 'ionic2-calendar';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/en';
registerLocaleData(localeEs);

import { IonicModule } from '@ionic/angular';

import { CalendarioPageRoutingModule } from './calendario-routing.module';

import { CalendarioPage } from './calendario.page';
import { CalendarModule } from "ion2-calendar";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarioPageRoutingModule,
    NgCalendarModule,
    CalendarModule.forRoot({
      doneLabel: 'Save',
      closeIcon: true
    })
  ],
  declarations: [CalendarioPage],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-EN'}
  ]
})
export class CalendarioPageModule {}
