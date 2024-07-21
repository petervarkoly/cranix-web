import { addIcons } from 'ionicons';
import { person, desktop, security, key } from 'ionicons/icons';
import { IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelfManagementService } from 'src/app/services/selfmanagement.service';
import { takeWhile } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
    selector: 'cranix-profile',
  imports: [ IonTabBar, IonTabButton, IonIcon ],
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    standalone: true,
})
export class ProfileComponent implements OnInit, OnDestroy {

  alive: boolean = true;
  vpn: boolean;

  constructor(
    private selfS: SelfManagementService,
    public authService: AuthenticationService
  ) {
    addIcons ({ person, desktop, security, key });
    if (this.authService.isAllowed('permitall')) {
      this.selfS.getVPNhave()
        .pipe(takeWhile(() => this.alive))
        .subscribe((res) => {
          this.vpn = res;
        })
    }

  }

  ngOnInit() { }

  ngOnDestroy() {
    this.alive = false;
  }
}
