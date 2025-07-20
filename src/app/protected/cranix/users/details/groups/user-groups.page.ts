import { Component, OnInit } from '@angular/core';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { ModalController } from '@ionic/angular';

//own stuff
import { UsersService } from 'src/app/services/users.service';
import { Group, User } from 'src/app/shared/models/data-model'
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  standalone: false,
  selector: 'cranix-user-groups',
  templateUrl: './user-groups.page.html',
  styleUrls: ['./user-groups.page.scss'],
})
export class UserGroupsPage implements OnInit {
  columnDefs = [];
  memberRawData: Group[] = [];
  noMemberRawData: Group[] = [];
  memberData: Group[] = [];
  noMemberData: Group[] = [];
  user;

  constructor(
    public authService: AuthenticationService,
    private objectService: GenericObjectService,
    public modalCtrl: ModalController,
    private userService: UsersService
  ) {
    this.user = <User>this.objectService.selectedObject;
  }

  ngOnInit() {
    this.readGroups();
  }

  onMemberFilterChanged() {
    let filter = (<HTMLInputElement>document.getElementById("memberFilter")).value.toLowerCase();
    let tmp = []
    for (let o of this.memberData) {
      if (o.name.toLowerCase().indexOf(filter) != -1 || o.description.toLowerCase().indexOf(filter) != -1) {
        tmp.push(o)
      }
    }
    this.memberRawData = tmp;
  }

  onNoMemberFilterChanged() {
    let filter = (<HTMLInputElement>document.getElementById("noMemberFilter")).value.toLowerCase();
    let tmp = []
    for (let o of this.noMemberData) {
      if (o.name.toLowerCase().indexOf(filter) != -1 || o.description.toLowerCase().indexOf(filter) != -1) {
        tmp.push(o)
      }
    }
    this.noMemberRawData = tmp;
  }

  addToGroup(id: number) {
    this.objectService.requestSent()
    this.userService.addUserToGroup(this.user.id, id).subscribe(
      (val) => {
        this.objectService.responseMessage(val)
        this.readGroups()
      }
    )
  }
  removeFromGroup(id: number) {
    this.objectService.requestSent()
    this.userService.removeUserFromGroup(this.user.id, id).subscribe(
      (val) => {
        this.objectService.responseMessage(val)
        this.readGroups()
      }
    )
  }
  readGroups() {
    this.userService.getUsersGroups(this.user.id).subscribe(
      (val) => {
        this.memberData = val
        this.memberRawData = val
        this.userService.getUsersAvailableGroups(this.user.id).subscribe(
          (val) => { 
            this.noMemberData = val
            this.noMemberRawData = val
          }
        )
      }
    );

  }
}
