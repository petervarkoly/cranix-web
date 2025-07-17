import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  standalone: false,
    selector: 'cranix-users-lists',
  templateUrl: './users-lists.page.html'
})
export class UsersListsPage {
  constructor(
    public authService: AuthenticationService,
    public translateService: TranslateService
  ) {}
}
