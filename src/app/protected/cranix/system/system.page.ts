import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'cranix-common';

@Component({     standalone: false,
  selector: 'cranix-system',
  templateUrl: './system.page.html'
})
export class SystemPage {
  constructor(
    public translateService: TranslateService,
    public authService: AuthenticationService
  ) {}
}
