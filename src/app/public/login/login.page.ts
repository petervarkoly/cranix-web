import { addIcons } from 'ionicons';
import { informationCircleOutline } from 'ionicons/icons';
import { IonCard, IonCardHeader, IonCardContent, IonLabel, IonInput, IonIcon, IonButton, IonItem, IonSelect, IonSelectOption, IonFooter } from '@ionic/angular/standalone';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
//Own modules
import { AuthenticationService } from 'src/app/services/auth.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { SystemService } from 'src/app/services/system.service';
import { LoginForm } from 'src/app/shared/models/server-models';
import { TranslateModule } from '@ngx-translate/core';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
    selector: 'cranix-login',
    imports: [FormsModule, AsyncPipe, TranslateModule, IonCard, IonCardHeader, IonCardContent, IonLabel, IonInput, IonIcon, IonButton, IonItem, IonSelect, IonSelectOption, IonFooter, NgFor, NgIf],
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    standalone: true,
})
export class LoginPage implements OnInit {
    instName: Observable<string>;
    instituteName: string = "";
    allowSavePassword: boolean = true;
    showPassword: boolean = false;
    totp: boolean = false;
    totppin: string = "";
    user: LoginForm;

    constructor(
        public authService: AuthenticationService,
        private systemService: SystemService,
        private objectService: GenericObjectService,
    ) {
    addIcons ({ informationCircleOutline });
        this.instName = this.systemService.getInstituteName();
    }

    ngOnInit() {
        this.user = new LoginForm();
    }

    login(): void {
        this.authService.setUpSession(this.user, this.instituteName);
    }

    checkPin() {
        let id: string = this.authService.crx2fa.split('#')[1]
        this.authService.checkTotPin(id, this.totppin);
    }

    sendPin() {
        let id: string = this.authService.crx2fa.split('#')[1]
        this.authService.sendPin(id).subscribe({
            next: (val) => { this.objectService.responseMessage(val) },
            error: (error) => { this.objectService.errorMessage(error) }
        })
    }

    ngOnDestroy() {
    }
}
