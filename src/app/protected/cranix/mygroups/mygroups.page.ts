import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { PopoverController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

//own modules
import { ObjectsEditComponent } from 'src/app/shared/objects-edit/objects-edit.component';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { Group, GuestUsers, Room, User } from 'src/app/shared/models/data-model'
import { AuthenticationService } from 'src/app/services/auth.service';
import { GroupMembersPage } from 'src/app/shared/actions/group-members/group-members.page';
import { EductaionService } from 'src/app/services/education.service';
import { CranixNoticesComponent } from 'src/app/shared/cranix-notices/cranix-notices.component';

@Component({
  standalone: false,
    selector: 'cranix-mygroups',
  templateUrl: './mygroups.page.html',
  styleUrls: ['./mygroups.page.scss'],
})
export class MyGroupsPage implements OnInit {
  segment: string = 'education/group';
  context;
  rowData = [];
  useNotice: boolean = false;
  mayGroupEdit: boolean = false;
  constructor(
    public authService: AuthenticationService,
    public educationService: EductaionService,
    public objectService: GenericObjectService,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public languageS: LanguageService,
    public route: Router,
    public translateService: TranslateService
  ) {

    this.useNotice = this.authService.isAllowed('notice.use')
    this.mayGroupEdit = this.authService.isOneOfAllowed(['group.modify','group.manage'])
    this.context = { componentParent: this };
  }
  async ngOnInit() {
    while (!this.objectService.allObjects['education/user']) {
      await new Promise(f => setTimeout(f, 1000));
    }
    if (this.authService.isMD()) {
      this.rowData = this.objectService.allObjects['education/group']
    }
    this.objectService.allObjects['education/user'].sort(
      (a, b) => (a.groupName > b.groupName) ? 1 : (b.groupName > a.groupName) ? -1 : 0
    );
  }

  segmentChanged(event) {
    this.segment = event.detail.value;
  }

  /**
   * Function to add or edit a group.
   * Group is null a new group will be created.
   * @param ev
   * @param group
   */
  async redirectToMembers(group: Group) {
    this.objectService.selectedObject = group;
    const modal = await this.modalCtrl.create({
      component: GroupMembersPage,
      cssClass: 'big-modal',
      animated: true,
      showBackdrop: true
    });
    (await modal).present();
  }

  async redirectToEdit(anyObject: any) {
    let action = anyObject ? 'modify' : 'add';
    let objectType = this.segment

    switch (this.segment) {
      case 'education/user': {
        if (!anyObject) { anyObject = new User() }
      }
      case 'education/group': {
        if (!anyObject) { anyObject = new Group() }
        delete anyObject.groupType
      }
    }
    if (action == 'add') {
      delete anyObject.id;
    }
    const modal = await this.modalCtrl.create({
      component: ObjectsEditComponent,
      cssClass: 'medium-modal',
      componentProps: {
        objectType: objectType,
        objectAction: action,
        object: anyObject
      },
      animated: true,
      showBackdrop: true
    });
    (await modal).present();
  }

  async addEditGuest(guest: GuestUsers) {
    let action = 'modify';
    if (!guest) {
      guest = new GuestUsers();
      action = 'add';
    }
    const modal = await this.modalCtrl.create({
      component: AddEditGuestPage,
      cssClass: 'medium-modal',
      componentProps: {
        action: action,
        guest: guest
      },
      animated: true,
      showBackdrop: true
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data) {
        this.objectService.getAllObject('education/guestUser');
        this.authService.log("Object was created or modified", dataReturned.data)
      }
    });
    (await modal).present();
  }

}

@Component({
  standalone: false,
    selector: 'cranix-add-edit-guest',
  templateUrl: './add-edit-guest.html'
})
export class AddEditGuestPage {

  now: string;
  disabled: boolean = false;
  selectedRooms: Room[] = []
  @Input() guest: GuestUsers
  @Input() action: string
  constructor(
    public educationService: EductaionService,
    public modalCtrl: ModalController,
    public objectService: GenericObjectService,
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.now = formatDate(Date.now(), 'yyyy-MM-dd', this.locale);
  }

  onSubmit() {
    this.objectService.requestSent();
    this.disabled = true;
    console.log(this.guest)
    for (let r of this.selectedRooms) {
      this.guest.roomIds.push(r.id)
    }
    this.educationService.addGuestUsers(this.guest).subscribe(
      (val) => {
        console.log(val)
        this.objectService.responseMessage(val);
        if (val.code == "OK") {
          this.modalCtrl.dismiss("OK")
        }
        this.disabled = false;
      }
    );
  }

}

