import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { CanActivateViaAcls } from 'cranix-common';

const routes: Routes = [
  {
    path: 'institutes',
    canActivate: [CanActivateViaAcls],
    loadChildren: () => import('./lists/institutes-lists.module').then( m => m.InstitutesListsPageModule)
  },
  {
    path: 'institutes/:id',
    canLoad: [CanActivateViaAcls],
    loadChildren: () => import('./details/institute-details.module').then( m => m.InstituteDetailsPageModule)
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    IonicModule,
  ],
  declarations: [ ]
})
export class InstitutesPageModule {}
