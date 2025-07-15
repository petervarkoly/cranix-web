import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

//own modules
import { DevicesListsPage }   from './devices-lists.page';
import { DevicesComponent }   from './devices.component';
import { PrintersComponent }  from './printers.component';
import { DevicePrintersComponent } from '../details/printers/device-printers.component';
import { CanActivateViaAcls } from 'cranix-common';

const routes: Routes = [
  {
    path: 'devices',
    canActivate: [CanActivateViaAcls],
    component: DevicesListsPage,
    children: [
      {
        path: 'all',
        component:  DevicesComponent
      },
      {
        path: 'printers',
        component: PrintersComponent
      },
      {
        path: '', redirectTo: 'all', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DevicesListsPage,DevicesComponent,PrintersComponent,DevicePrintersComponent]
})
export class DevicesListsModule { }

