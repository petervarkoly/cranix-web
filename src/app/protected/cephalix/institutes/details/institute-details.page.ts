import { IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'cranix-institute-details',
    imports: [ IonTabBar, IonTabButton, IonIcon ],
    templateUrl: './institute-details.page.html',
    styleUrls: ['./institute-details.page.scss'],
    standalone: true,
})
export class InstituteDetailsPage {
  constructor(
    public translateService: TranslateService
  ) {}
}
