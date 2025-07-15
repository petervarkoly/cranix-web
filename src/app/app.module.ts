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
import { CranixCommonModule } from 'cranix-common';

//own services
import { CrxCalendarService } from 'cranix-common';
import { CephalixService } from 'cranix-common';
import { DevicesService } from 'cranix-common';
import { EductaionService } from 'cranix-common';
import { GenericObjectService } from 'cranix-common';
import { CrxObjectService } from 'cranix-common';
import { GroupsService } from 'cranix-common';
import { HwconfsService } from 'cranix-common';
import { InformationsService } from 'cranix-common';
import { LanguageService } from 'cranix-common';
import { PrintersService } from 'cranix-common';
import { ParentsService } from 'cranix-common';
import { RoomsService } from 'cranix-common';
import { SecurityService } from 'cranix-common';
import { SoftwareService } from 'cranix-common';
import { SystemService } from 'cranix-common';
import { UsersService } from 'cranix-common';
import { UtilsService } from 'cranix-common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    CranixCommonModule,
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
