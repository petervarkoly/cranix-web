import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CanActivateViaAcls } from 'cranix-common/dist/services/auth-guard.service';
import { IonicModule } from '@ionic/angular';
import { CranixSharedModule } from 'src/app/cranix-shared.module';
import { TranslateService } from '@ngx-translate/core';
import { PipesModule } from 'cranix-common/dist/pipes/pipe-modules';
import { ProfileComponent } from './profile.component'
import { MyselfComponent } from './tabs/myself/myself.component'
import { MyDevicesComponent } from './tabs/my-devices/my-devices.component'
import { MyVPNComponent } from './tabs/my-vpn/my-vpn.component'
import { MyCrx2faComponent } from './tabs/my-crx2fa/my-crx2fa.component'
import { SelfManagementService } from 'cranix-common/dist/services/selfmanagement.service';
import { AdHocLanService } from 'cranix-common/dist/services/adhoclan.service';

const routes: Routes = [
  {
    path: 'profile',
    canActivate: [CanActivateViaAcls],
    component: ProfileComponent,
    children: [
      {
        path: 'myself',
        component: MyselfComponent
      },
      {
        path: 'mydevice',
        component: MyDevicesComponent
      },
      {
        path: 'myVPN',
        component: MyVPNComponent
      },{
        path: 'crx2fa',
        component: MyCrx2faComponent,
        pathMatch: 'full'
      },
      {
        path: '',
        redirectTo: 'myself', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    IonicModule,
    CranixSharedModule
  ],
  declarations: [ProfileComponent,MyselfComponent,MyDevicesComponent,MyVPNComponent,MyCrx2faComponent],
  providers: [TranslateService, PipesModule,SelfManagementService,AdHocLanService]
})
export class ProfileModule { }
