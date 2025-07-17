import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  standalone: false,
    selector: 'cranix-institute-details',
  templateUrl: './institute-details.page.html',
  styleUrls: ['./institute-details.page.scss'],
})
export class InstituteDetailsPage {
  constructor(
    public translateService: TranslateService
  ) {}
}
