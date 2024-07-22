import { NgIf, NgFor } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { hammer, statsChart, create } from 'ionicons/icons';
import { IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
    selector: 'cranix-softwares',
  imports: [ NgIf, NgFor, TranslateModule, IonTabBar, IonTabButton, IonIcon ],
    templateUrl: './softwares.page.html',
    styleUrls: ['./softwares.page.scss'],
    standalone: true,
})
export class SoftwaresPage {
  constructor(
    public authService: AuthenticationService
  ) {
    addIcons ({ hammer, statsChart, create });}
}
