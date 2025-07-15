import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { CanActivateViaAcls } from 'cranix-common';
import { CustomersPage, EditInstitutes } from './customers.page';

const routes: Routes = [
  {
    path: 'customers',
    canActivate: [CanActivateViaAcls],
    component: CustomersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    IonicModule,
  ],
  declarations: [ CustomersPage, EditInstitutes]
})
export class CustomersPageModule {}
