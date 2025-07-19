import { Component } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

//own modules
import { ObjectsEditComponent } from 'src/app/shared/objects-edit/objects-edit.component';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { Group } from 'src/app/shared/models/data-model'
import { AuthenticationService } from 'src/app/services/auth.service';
import { GroupMembersPage } from 'src/app/shared/actions/group-members/group-members.page';

@Component({
  standalone: false,
    selector: 'cranix-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage {
  objectKeys: string[] = [];
  displayedColumns: string[] = ['name', 'description', 'groupType', 'actions'];
  sortableColumns: string[] = ['name', 'description', 'groupType'];
  context;
  mayGroupEdit: boolean = false
  constructor(
    public authService: AuthenticationService,
    public objectService: GenericObjectService,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public languageS: LanguageService,
    public route: Router,
  ) {
    this.context = { componentParent: this };
    this.objectKeys = Object.getOwnPropertyNames(new Group());
    this.mayGroupEdit = this.authService.isOneOfAllowed(['group.modify','group.manage'])
  }

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

  async redirectToEdit(group: Group) {
    let action = 'modify';
    if (!group) {
      group = new Group();
      action = 'add';
    }
    const modal = await this.modalCtrl.create({
      component: ObjectsEditComponent,
      cssClass: 'small-modal',
      componentProps: {
        objectType: "group",
        objectAction: action,
        object: group
      },
      animated: true,
      showBackdrop: true
    });
    (await modal).present();
  }
}
