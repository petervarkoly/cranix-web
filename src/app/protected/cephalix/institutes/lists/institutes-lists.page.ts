import { IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
    selector: 'cranix-institutes-lists',
    imports: [ IonTabBar, IonTabButton, IonIcon ],
    templateUrl: './institutes-lists.page.html',
    standalone: true
})
export class InstitutesListsPage {
  constructor(
    public translateService: TranslateService,
    public authService: AuthenticationService
  ) {
  }
}
