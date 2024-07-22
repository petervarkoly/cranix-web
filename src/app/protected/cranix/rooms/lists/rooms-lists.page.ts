import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { caretBack, wifi } from 'ionicons/icons';
import { IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { Component } from '@angular/core';

@Component({
    selector: 'cranix-rooms-lists',
  imports: [ TranslateModule, IonTabBar, IonTabButton, IonIcon ],
    templateUrl: './rooms-lists.page.html',
    standalone: true
})      
export class RoomsListsPage {
  constructor(
  ) {
    addIcons ({ caretBack, wifi });}  
}
