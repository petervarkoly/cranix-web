import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

//own modules
import { CanActivateViaAcls } from 'cranix-common';
import { TicketsPage } from './tickets.page';

const routes: Routes = [
  {
    path: 'tickets',
    canActivate: [CanActivateViaAcls],
    component: TicketsPage
  },
  {
    path: 'tickets/:id',
    canLoad: [CanActivateViaAcls],
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    IonicModule,
  ],
  declarations: [TicketsPage],
  providers: [TranslateService]
})
export class TicketsPageModule {}
