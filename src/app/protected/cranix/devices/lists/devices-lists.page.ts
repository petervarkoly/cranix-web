import { IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'cranix-devices-lists',
  imports: [ IonTabBar, IonTabButton, IonIcon ],
    templateUrl: './devices-lists.page.html',
    standalone: true
})      
export class DevicesListsPage {
  constructor(
    public translateService: TranslateService
  ) {}  
}
