import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import { RegisterPTMComponent } from './register-ptm/register-ptm.component';
const routes: Routes = [
  {
    path: '',
    children: [
        { 
          path: 'registerPTM/:id',
          component: RegisterPTMComponent
        }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule,RegisterPTMComponent],
  declarations: [RegisterPTMComponent]
})
export class TrustedModule {}
