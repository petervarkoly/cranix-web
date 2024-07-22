import { Component } from '@angular/core';
import { Platform } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
//own services
import { AuthenticationService } from './services/auth.service';
import { GenericObjectService } from './services/generic-object.service';
import { LanguageService } from './services/language.service';
import { LoginPage } from './public/login/login.page';
import { ProtectedPage } from './protected/protected.page'
@Component({
    selector: 'app-root',
    imports: [ LoginPage, ProtectedPage ],
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: true
})
export class AppComponent {
  public logged_in = false;
  constructor(
    private authService: AuthenticationService,
    private genericObjectS: GenericObjectService,
    private languageService: LanguageService,
    private platform: Platform,
    private router: Router
  ) {
  }

  ngOnInit() {
    console.log("AppComponenet ngOnInit");
    this.initializeApp();
  }

  initializeApp() {
    console.log("AppComponenet initializeApp");
    console.log(this.router.config)
    this.platform.ready().then(() => {
      this.authService.authenticationState.subscribe(state => {
        console.log("pathname :" + window.location.pathname);
        if( window.location.pathname != '/login' ) {
          this.authService.requestedPath = window.location.pathname.substring(1);
        }
        if ( this.authService.session ) {
          console.log("token :" + this.authService.session.token );
        }
        console.log("authenticationState",state)
        console.log("cephalix_token",sessionStorage.getItem('cephalix_token'))
        console.log("shortName",sessionStorage.getItem('shortName'))
        if (state) {
          this.logged_in = true
          if(!this.authService.session.mustSetup2fa) {
            this.genericObjectS.initialize(true);
          }
          if(this.authService.session.mustSetup2fa) {
            console.log('initializeApp: 2FA must be set up');
            this.router.navigate(['protected/cranix/profile/crx2fa']);
          } else if(this.authService.session.mustChange) {
            this.genericObjectS.warningMessage(this.languageService.trans('Your password is expired. You have to change it.'));
            console.log('initializeApp: Password must be changed');
            this.router.navigate(['protected/cranix/profile/myself']);
          } else if(this.authService.requestedPath) {
            console.log('initializeApp: requestedPath is defined');
            this.router.navigate([this.authService.requestedPath]);
            this.authService.requestedPath = undefined;
          } else if( this.authService.isAllowed('cephalix.manage')) {
            console.log('protected/cephalix/institutes/all');
            this.router.navigate(['protected/cephalix/institutes/all']);
          } else if ( this.authService.isAllowed('user.manage') ) {
            console.log('protected/cranix/users/all');
            this.router.navigate(['protected/cranix/users/all']);
          } else if ( this.authService.session['role'] == 'teachers' ) {
            console.log('protected/cranix/mygroups');
            this.router.navigate(['protected/cranix/mygroups']);
          } else {
            console.log('protected/cranix/profile/myself');
            this.router.navigate(['protected/cranix/profile/myself']);
          }
        } else if( sessionStorage.getItem('screenShot') ) {
          this.router.navigate(['public/showScreen']);
        } else if (sessionStorage.getItem('cephalix_token')) {
          this.authService.token     = sessionStorage.getItem('cephalix_token');
          this.authService.loadSession();
          this.router.navigate(['protected/cranix/users/all']);
        } else {
          this.router.navigate(['login']);
        }
      });
    });
  }
}
