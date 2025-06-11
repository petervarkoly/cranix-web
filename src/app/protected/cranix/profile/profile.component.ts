import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelfManagementService } from 'cranix-common/dist/services/selfmanagement.service';
import { takeWhile } from 'rxjs/operators';
import { AuthenticationService } from 'cranix-common/dist/services/auth.service';

@Component({
  selector: 'cranix-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {

  alive: boolean = true;
  vpn: boolean;

  constructor(
    private selfS: SelfManagementService,
    public authService: AuthenticationService
  ) {
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
