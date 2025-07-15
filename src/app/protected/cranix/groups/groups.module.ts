import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { CanActivateViaAcls } from 'cranix-common';
import { GroupsPage } from './groups.page';

const routes: Routes = [
  {
    path: 'groups',
    canActivate: [CanActivateViaAcls],
    component: GroupsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    IonicModule,
  ],
  declarations: [ GroupsPage ]
})
export class GroupsPageModule {}
