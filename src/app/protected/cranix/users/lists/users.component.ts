import { Component } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';

//own modules
import { ObjectsEditComponent } from 'src/app/shared/objects-edit/objects-edit.component';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { User } from 'src/app/shared/models/data-model'
import { AuthenticationService } from 'src/app/services/auth.service';
import { UserGroupsPage } from '../details/groups/user-groups.page';
import { SystemService } from 'src/app/services/system.service';

@Component({
  standalone: false,
    selector: 'cranix-users',
  templateUrl: './users.component.html'
})
export class UsersComponent {
  objectKeys: string[] = [
    "id",
    "uid",
    "uuid",
    "surName",
    "givenName",
    "birthDay",
    "password",
    "role",
    "mustChange",
    "classes",
    "emailAddress",
    "telefonNumber",
    "mailAliases",
    "msQuota",
    "fsQuota",
    "msQuotaUsed",
    "fsQuotaUsed",
    "created",
    "modified"
  ];
  newObjectKeys: string[] = [
    "uid",
    "uuid",
    "surName",
    "givenName",
    "birthDay",
    "password",
    "role",
    "mustChange",
    "emailAddress",
    "telefonNumber",
    "mailAliases",
    "msQuota",
    "fsQuota"
  ];
  context;
  defaultMustChange: boolean = true;
  useNotice: boolean = false;
  constructor(
    public authService: AuthenticationService,
    public objectService: GenericObjectService,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public languageS: LanguageService,
    private systemService: SystemService
  ) {
    this.context = { componentParent: this };
    this.systemService.getSystemConfigValue("DEFAULT_MUST_CHANGE").subscribe(
      (val) => {
        if (val == "no") {
          this.defaultMustChange = false
        }
      }
    )
  }

  async redirectToGroups(user: User) {
    this.objectService.selectedObject = user;
    const modal = await this.modalCtrl.create({
      component: UserGroupsPage,
      cssClass: 'big-modal',
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

  async redirectToEdit(user: User) {
    let action = "modify";
    let keys = this.objectKeys
    if (!user) {
      user = new User();
      user.mustChange = this.defaultMustChange;
      delete user.msQuotaUsed;
      delete user.fsQuotaUsed;
      delete user.mailAliases;
      delete user.classes;
      keys = this.newObjectKeys
      action = 'add';
    }
    const modal = await this.modalCtrl.create({
      component: ObjectsEditComponent,
      cssClass: 'medium-modal',
      componentProps: {
        objectType: "user",
        objectAction: action,
        object: user,
        objectKeys: keys
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
