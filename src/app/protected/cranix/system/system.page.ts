import { NgIf, NgFor } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { statsChart, pulse, cog, colorWand, hammer, mail } from 'ionicons/icons';
import { IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
    selector: 'cranix-system',
  imports: [ NgIf, NgFor, TranslateModule, IonTabBar, IonTabButton, IonIcon ],
    templateUrl: './system.page.html',
    standalone: true
})
export class SystemPage {
  constructor(
    public authService: AuthenticationService
  ) {
    addIcons ({ statsChart, pulse, cog, colorWand, hammer, mail });}
}
