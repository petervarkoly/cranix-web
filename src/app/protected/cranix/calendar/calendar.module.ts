import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { RouterModule, Routes } from '@angular/router';
import { TranslateService  } from '@ngx-translate/core';

import { CalendarComponent } from './calendar.component';
import { CanActivateViaAcls } from 'cranix-common';


const routes: Routes = [
  {
    path: 'calendar',
    canActivate: [CanActivateViaAcls],
    component: CalendarComponent
  }
];

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    FullCalendarModule,
    RouterModule.forChild(routes),
  ],
  providers: [TranslateService]
})
export class CalendarModule { }
