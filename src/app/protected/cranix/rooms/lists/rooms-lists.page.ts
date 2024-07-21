import { addIcons } from 'ionicons';
import { caretBack, wifi } from 'ionicons/icons';
import { IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'cranix-rooms-lists',
  imports: [ IonTabBar, IonTabButton, IonIcon ],
    templateUrl: './rooms-lists.page.html',
    standalone: true
})      
export class RoomsListsPage {
  constructor(
    public translateService: TranslateService
  ) {
    addIcons ({ caretBack, wifi });}  
}
