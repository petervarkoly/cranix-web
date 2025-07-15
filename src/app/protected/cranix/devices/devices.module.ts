import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateService  } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { CanActivateViaAcls } from 'cranix-common';

const routes: Routes = [
  {
    path: 'devices',
    canActivate: [CanActivateViaAcls],
    loadChildren: () => import('./lists/devices-lists.module').then( m => m.DevicesListsModule)
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
export class DevicesPageModule {}
