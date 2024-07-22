import { TranslateModule } from '@ngx-translate/core';
import { CranixToolbarComponent } from 'src/app/protected/toolbar/toolbar.component';
import { addIcons } from 'ionicons';
import { caretBack, create, logoBuffer } from 'ionicons/icons';
import { IonRow, IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { Component } from '@angular/core';

@Component({
    selector: 'cranix-hwconf-details',
  imports: [ TranslateModule, CranixToolbarComponent, IonRow, IonTabBar, IonTabButton, IonIcon ],
    templateUrl: './hwconf-details.page.html',
    styleUrls: ['./hwconf-details.page.scss'],
    standalone: true,
})
export class HwconfDetailsPage {
  constructor(
  ) {
    addIcons ({ caretBack, create, logoBuffer });}
}
