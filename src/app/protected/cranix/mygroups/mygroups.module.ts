import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { CanActivateViaAcls } from 'cranix-common';
import { MyGroupsPage,AddEditGuestPage }       from './mygroups.page';

const routes: Routes = [
  {
    path: 'mygroups',
    canActivate: [CanActivateViaAcls],
    component: MyGroupsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    IonicModule,
  ],
  declarations: [ MyGroupsPage, AddEditGuestPage],
})
export class MyGroupsPageModule {}

