import { NgIf, NgFor } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CranixToolbarComponent } from 'src/app/protected/toolbar/toolbar.component';
import { addIcons } from 'ionicons';
import { key, handLeft, call, globeOutline, receiptOutline } from 'ionicons/icons';
import { IonRow, IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { Component } from '@angular/core';

import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
    selector: 'cranix-security',
  imports: [ NgIf, NgFor, TranslateModule, CranixToolbarComponent, IonRow, IonTabBar, IonTabButton, IonIcon ],
    templateUrl: './security.page.html',
    styleUrls: ['./security.page.scss'],
    standalone: true,
})
export class SecurityPage {
  constructor(
    public authS: AuthenticationService
  ) {
    addIcons ({ key, handLeft, call, globeOutline, receiptOutline });}
}
