import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { CanActivateViaAcls } from 'cranix-common';
import { HwconfsPage } from './hwconfs.page';

const routes: Routes = [
  {
    path: 'hwconfs',
    canActivate: [CanActivateViaAcls],
    component: HwconfsPage
  },
  {
    path: 'hwconfs/:id',
    canLoad: [CanActivateViaAcls],
    loadChildren: () => import('./details/hwconf-details.module').then( m => m.HwconfDetailsPageModule)
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    IonicModule,
  ],
  declarations: [ HwconfsPage ]
})
export class HwconfsPageModule {}
