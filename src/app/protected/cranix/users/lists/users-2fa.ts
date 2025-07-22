import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/auth.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';


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

