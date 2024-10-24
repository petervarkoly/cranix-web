import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CalendarPage } from './calendar.page';
import { CranixSharedModule } from 'src/app/shared/cranix-shared.module';
import { CanActivateViaAcls } from 'src/app/services/auth-guard.service';
import { CalendarModule } from 'angular-calendar';
import { DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

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
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  declarations: [CalendarPage],
  providers: [TranslateService]
})
export class CalendarPageModule {}
