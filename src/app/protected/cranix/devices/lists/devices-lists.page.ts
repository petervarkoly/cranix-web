import { addIcons } from 'ionicons';
import { caretBack, print } from 'ionicons/icons';
import { IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'cranix-devices-lists',
  imports: [ TranslateModule, IonTabBar, IonTabButton, IonIcon ],
    templateUrl: './devices-lists.page.html',
    standalone: true
})      
export class DevicesListsPage {
  constructor(
    public translateService: TranslateService
  ) {
    addIcons ({ caretBack, print });}  
}
