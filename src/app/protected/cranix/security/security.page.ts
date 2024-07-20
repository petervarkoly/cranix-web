import { IonRow, IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
    selector: 'cranix-security',
  imports: [ IonRow, IonTabBar, IonTabButton, IonIcon ],
    templateUrl: './security.page.html',
    styleUrls: ['./security.page.scss'],
    standalone: true,
})
export class SecurityPage {
  constructor(
    public authS: AuthenticationService,
    public translateService: TranslateService
  ) {}
}
