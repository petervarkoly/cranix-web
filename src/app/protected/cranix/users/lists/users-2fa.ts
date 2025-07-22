import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';


@Component({
    standalone: false,
    selector: 'cranix-users-2fa',
    templateUrl: './users-2fa.html',
    // styleUrls: ['./user-import.component.scss'],

})
export class Users2faComponent {
    context;
    constructor(
        public authService: AuthenticationService

    ) {
        this.context = { componentParent: this };
    }
}

