import { IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
    selector: 'cranix-users-lists',
  imports: [ IonTabBar, IonTabButton, IonIcon ],
    templateUrl: './users-lists.page.html',
    standalone: true
})
export class UsersListsPage {
  constructor(
    public authService: AuthenticationService,
    public translateService: TranslateService
  ) {}
}
