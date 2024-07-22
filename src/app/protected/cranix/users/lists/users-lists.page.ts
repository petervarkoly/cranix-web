import { NgIf, NgFor } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { caretBack, receipt, key } from 'ionicons/icons';
import { IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
    selector: 'cranix-users-lists',
  imports: [ NgIf, NgFor, TranslateModule, IonTabBar, IonTabButton, IonIcon ],
    templateUrl: './users-lists.page.html',
    standalone: true
})
export class UsersListsPage {
  constructor(
    public authService: AuthenticationService,
  ) {
    addIcons ({ caretBack, receipt, key });}
}
