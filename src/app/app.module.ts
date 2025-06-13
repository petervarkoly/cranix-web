import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { QuillModule } from 'ngx-quill';

//own modules
import { CranixSharedModule } from './cranix-shared.module';

//own services
import { CrxCalendarService } from 'cranix-common/dist/services/crx-calendar.service';
import { CephalixService } from 'cranix-common/dist/services/cephalix.service';
import { DevicesService } from 'cranix-common/dist/services/devices.service';
import { EductaionService } from 'cranix-common/dist/services/education.service';
import { GenericObjectService } from 'cranix-common/dist/services/generic-object.service';
import { CrxObjectService } from 'cranix-common/dist/services/crx-object-service';
import { GroupsService } from 'cranix-common/dist/services/groups.service';
import { HwconfsService } from 'cranix-common/dist/services/hwconfs.service';
import { InformationsService } from 'cranix-common/dist/services/informations.services';
import { LanguageService } from 'cranix-common/dist/services/language.service';
import { PrintersService } from 'cranix-common/dist/services/printers.service';
import { ParentsService } from 'cranix-common/dist/services/parents.service';
import { RoomsService } from 'cranix-common/dist/services/rooms.service';
import { SecurityService } from 'cranix-common/dist/services/security-service';
import { SoftwareService } from 'cranix-common/dist/services/softwares.service';
import { SystemService } from 'cranix-common/dist/services/system.service';
import { UsersService } from 'cranix-common/dist/services/users.service';
import { UtilsService } from 'cranix-common/dist/services/utils.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    CranixSharedModule,
    DragDropModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    QuillModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CephalixService,
    CrxObjectService,
    CrxCalendarService,
    DevicesService,
    EductaionService,
    GenericObjectService,
    GroupsService,
    HwconfsService,
    InformationsService,
    LanguageService,
    PrintersService,
    ParentsService,
    RoomsService,
    SecurityService,
    SoftwareService,
    SystemService,
    TranslateService,
    TranslateStore,
    UsersService,
    UtilsService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}

