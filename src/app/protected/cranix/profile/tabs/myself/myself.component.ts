import { addIcons } from 'ionicons';
import { calendar, cube, folder } from 'ionicons/icons';
import { IonContent, IonIcon, IonItem, IonButton } from '@ionic/angular/standalone';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/shared/models/data-model';
import { SelfManagementService } from 'src/app/services/selfmanagement.service';
import { takeWhile } from 'rxjs/internal/operators/takeWhile';
import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular/standalone';
import { SetpasswordComponent } from 'src/app/shared/actions/setpassword/setpassword.component';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
    selector: 'cranix-myself',
  imports: [ IonContent, IonIcon, IonItem, IonButton ],
    templateUrl: './myself.component.html',
    styleUrls: ['./myself.component.scss'],
    standalone: true,
})
export class MyselfComponent implements OnInit, OnDestroy {

  alive: boolean = true;
  mySelf: User;

  constructor(
    private mySelfs: SelfManagementService,
    public translateService: TranslateService,
    public objectService: GenericObjectService,
    public modalController: ModalController,
    public authService: AuthenticationService
  ) {
    addIcons ({ calendar, cube, folder });
    this.mySelfs.getMySelf()
      .pipe(takeWhile(() => this.alive))
      .subscribe((res) => {
        console.log('I am: ', res);
        this.mySelf = res;
      })
  }

  ngOnInit() {
  }

  async openChangePW() {
    const modal = await this.modalController.create({
      component: SetpasswordComponent,
      cssClass: 'small-modal',
      animated: true,
      showBackdrop: true,
      componentProps: {
        'type': 'ownChange',
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data) {
        this.objectService.requestSent();
        this.mySelf.password = dataReturned.data.password;
        console.log('user after mod:', this.mySelf);
        this.mySelfs.modMySelf(this.mySelf)
          .pipe(takeWhile(() => this.alive))
          .subscribe((res) => {
            console.log('response is:', res);
            this.objectService.responseMessage(res)
            if( res.code == "OK") {
              this.authService.session.mustChange = false;
            }
          }, (err) => {
            this.objectService.errorMessage(err);
          })
      }
    });
    return await modal.present();
  }
  ngOnDestroy() {
    this.alive = false;
  }

}
