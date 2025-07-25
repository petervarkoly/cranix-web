import { Component } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

//own modules
import { AuthenticationService } from 'src/app/services/auth.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { CephalixService } from 'src/app/services/cephalix.service';
import { Institute } from 'src/app/shared/models/cephalix-data-model'
import { User } from 'src/app/shared/models/data-model';

@Component({
  standalone: false,
  selector: 'cranix-institutes',
  templateUrl: './institutes.manage.html',
  styleUrls: ['./institutes.manage.scss'],
})
export class InstitutesManage {
  managerUsers: User[] = []
  manager: User
  myInstitutes: Institute[] = []
  isManageInstituteOpen: boolean = false
  context;

  constructor(
    public authService: AuthenticationService,
    public cephalixService: CephalixService,
    public objectService: GenericObjectService,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public languageS: LanguageService,
    public route: Router
  ) {
    this.context = { componentParent: this };
    let tmp = []
    for (let user of this.objectService.allObjects['user']) {
      if (user.role.toLowerCase() == "reseller" || user.role == "sysadmins") {
        tmp.push(user)
      }
    }
    this.managerUsers = tmp
  }

  manageMyInstitute(user: User) {
    this.manager = user
    this.cephalixService.getInstitutesFromUser(user.id).subscribe(
      (val) => {
        this.myInstitutes = val
        this.isManageInstituteOpen = true
        console.log(this.myInstitutes)
      }
    )
  }

  applyChanges(modal) {
    this.objectService.requestSent()
    for (let institute of this.myInstitutes) {
      this.cephalixService.addUserToInstitute(this.manager.id, institute.id)
    }
    modal.dismiss()
    this.isManageInstituteOpen = false
  }

  closeModal(modal) {
    modal.dismiss()
    this.isManageInstituteOpen = false
  }
}
