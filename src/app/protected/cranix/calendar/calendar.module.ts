import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CalendarPage } from './calendar.page';
import { NgCalendarModule } from './Ionic2-Calendar';

import { CranixSharedModule } from 'src/app/shared/cranix-shared.module';
import { CanActivateViaAcls } from 'src/app/services/auth-guard.service';

const routes: Routes = [
  {
    path: 'calendar',
    //canActivate: [CanActivateViaAcls],
    component: CalendarPage
  }
];


@NgModule({
  imports: [
    CommonModule,
    CranixSharedModule,
    FormsModule,
    RouterModule.forChild(routes),
    IonicModule,
    NgCalendarModule
  ],
  declarations: [CalendarPage],
  providers: [TranslateService]
})
export class CalendarPageModule {}
