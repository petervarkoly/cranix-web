import { addIcons } from 'ionicons';
import { statsChart, pulse, cog, colorWand, hammer, mail } from 'ionicons/icons';
import { IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
    selector: 'cranix-system',
  imports: [ IonTabBar, IonTabButton, IonIcon ],
    templateUrl: './system.page.html',
    standalone: true
})
export class SystemPage {
  constructor(
    public translateService: TranslateService,
    public authService: AuthenticationService
  ) {
    addIcons ({ statsChart, pulse, cog, colorWand, hammer, mail });}
}
