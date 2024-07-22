import { addIcons } from 'ionicons';
import { caretBack, create, statsChart, codeWorking, reader } from 'ionicons/icons';
import { IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'cranix-institute-details',
    imports: [ TranslateModule, IonTabBar, IonTabButton, IonIcon ],
    templateUrl: './institute-details.page.html',
    styleUrls: ['./institute-details.page.scss'],
    standalone: true,
})
export class InstituteDetailsPage {
  constructor(
    public translateService: TranslateService
  ) {
    addIcons ({ caretBack, create, statsChart, codeWorking, reader });}
}
