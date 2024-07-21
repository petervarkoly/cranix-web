import { addIcons } from 'ionicons';
import { hammer, statsChart, create } from 'ionicons/icons';
import { IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
    selector: 'cranix-softwares',
  imports: [ IonTabBar, IonTabButton, IonIcon ],
    templateUrl: './softwares.page.html',
    styleUrls: ['./softwares.page.scss'],
    standalone: true,
})
export class SoftwaresPage {
  constructor(
    public translateService: TranslateService,
    public authService: AuthenticationService
  ) {
    addIcons ({ hammer, statsChart, create });}
}
