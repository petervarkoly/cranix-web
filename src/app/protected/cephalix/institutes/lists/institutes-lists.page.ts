import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'cranix-common';

@Component({     standalone: false,
  selector: 'cranix-institutes-lists',
  templateUrl: './institutes-lists.page.html'
})
export class InstitutesListsPage {
  constructor(
    public translateService: TranslateService,
    public authService: AuthenticationService
  ) {
  }
}
