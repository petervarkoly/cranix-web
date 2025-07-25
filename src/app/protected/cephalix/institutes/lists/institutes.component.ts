import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

//own modules
import { AuthenticationService } from 'src/app/services/auth.service';
import { CephalixService } from 'src/app/services/cephalix.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { Institute } from 'src/app/shared/models/cephalix-data-model'
import { ObjectsEditComponent } from 'src/app/shared/objects-edit/objects-edit.component';
import { WindowRef } from 'src/app/shared/models/ohters';

@Component({
  standalone: false,
  selector: 'cranix-institutes',
  templateUrl: './institutes.component.html',
  styleUrls: ['./institutes.component.scss'],
})
export class InstitutesComponent {
  context;
  nativeWindow: any

  constructor(
    private win: WindowRef,
    public authService: AuthenticationService,
    public cephalixService: CephalixService,
    public objectService: GenericObjectService,
    public modalCtrl: ModalController,
    public route: Router
  ) {
    this.context = { componentParent: this };
    this.nativeWindow = win.getNativeWindow()
  }

  async redirectToEdit(institute: Institute) {
    if (institute) {
      this.objectService.selectedObject = institute;
      this.route.navigate(['/pages/cephalix/institutes/' + institute.id]);
    } else {
      const modal = await this.modalCtrl.create({
        component: ObjectsEditComponent,
        componentProps: {
          objectType: "institute",
          objectAction: 'add',
          object: this.cephalixService.getTemplateInstitute()
        },
        animated: true,
        showBackdrop: true
      });
      modal.onDidDismiss().then((dataReturned) => {
        if (dataReturned.data) {
          this.authService.log("Object was created or modified", dataReturned.data)
        }
      });
      (await modal).present();
    }
  }

  public routeInstitute(institute: Institute) {
    var hostname = window.location.hostname;
    var protocol = window.location.protocol;
    var port = window.location.port;
    this.cephalixService.getInstituteToken(institute.id)
      .subscribe(
        async (res) => {
          let token = res;
          console.log("Get bla token from:" + institute.uuid)
          console.log(res);
          if (!res) {
            this.objectService.errorMessage('Can not connect  to "' + institute.name + '"')
          } else {
            sessionStorage.setItem('shortName', institute.uuid);
            sessionStorage.setItem('instituteName', institute.name);
            sessionStorage.setItem('cephalix_token', token);
            if (port) {
              this.nativeWindow.open(`${protocol}//${hostname}:${port}`);
            } else {
              this.nativeWindow.open(`${protocol}//${hostname}`);
            }
            sessionStorage.removeItem('shortName');
          }
        }
      )
  }
}
