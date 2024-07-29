import { Component } from '@angular/core';
import { UsersListComponent } from './lists/users-list.component'
import { UsersImportComponent } from './lists/users-import.component'
import { Users2faComponent } from './lists/users-2fa'
import { CranixToolbarComponent } from 'src/app/protected/toolbar/toolbar.component'
import { IonSegment, IonSegmentButton, IonLabel, IonIcon, IonHeader } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { people, list, key } from 'ionicons/icons';
import { NgIf } from '@angular/common'
import { AuthenticationService } from 'src/app/services/auth.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UsersListComponent, UsersImportComponent, Users2faComponent, CranixToolbarComponent, IonSegment, IonSegmentButton, IonLabel, IonIcon, IonHeader, NgIf, TranslateModule ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  public segment = "users"

  constructor(public authService: AuthenticationService) {
    addIcons({people, list, key} )
  }

  segmentChanged(event) {
    this.segment = event.detail.value;
  }
}
