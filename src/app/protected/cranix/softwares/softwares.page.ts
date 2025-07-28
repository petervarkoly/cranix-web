import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  standalone: false,
    selector: 'cranix-softwares',
  templateUrl: './softwares.page.html',
  styleUrls: ['./softwares.page.scss'],
})
export class SoftwaresPage {
  constructor(
    public authService: AuthenticationService
  ) {}
}
