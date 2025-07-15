import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateViaAcls } from 'cranix-common';
import { IonicModule } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { InformationsComponent, AddEditInfoPage, ShowResponses } from 'src/app/protected/cranix/informations/informations.component'
import { QuillModule } from 'ngx-quill';

const routes: Routes = [
  {
    path: 'informations',
    canActivate: [CanActivateViaAcls],
    component: InformationsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    QuillModule.forRoot({
      modules: {
        table: true},
      theme: 'bubble'
    }),
    RouterModule.forChild(routes)
  ],
  declarations: [InformationsComponent, AddEditInfoPage,  ShowResponses],
  providers: [TranslateService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InformationsModule { }
