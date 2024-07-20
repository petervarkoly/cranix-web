import { IonRow, IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'cranix-hwconf-details',
  imports: [ IonRow, IonTabBar, IonTabButton, IonIcon ],
    templateUrl: './hwconf-details.page.html',
    styleUrls: ['./hwconf-details.page.scss'],
    standalone: true,
})
export class HwconfDetailsPage {
  constructor(
    public translateService: TranslateService
  ) {}
}
