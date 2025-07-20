import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

//own stuff
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { GroupsService } from 'src/app/services/groups.service';
import { Group, User } from 'src/app/shared/models/data-model'
import { AuthenticationService } from 'src/app/services/auth.service';
@Component({
  standalone: false,
    selector: 'cranix-group-members',
  templateUrl: './group-members.page.html',
  styleUrls: ['./group-members.page.scss'],
})
export class GroupMembersPage implements OnInit {
  memberRawData: User[] = [];
  noMemberRawData: User[] = [];
  memberData: User[] = [];
  noMemberData: User[] = [];
  group;

  constructor(
    public authService: AuthenticationService,
    private objectService: GenericObjectService,
    private groupService: GroupsService,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    console.log('innerWidth', window.innerWidth)
    this.group = <Group>this.objectService.selectedObject;
    this.readMembers();
  }
  onMemberFilterChanged() {
    let filter = (<HTMLInputElement>document.getElementById("memberFilter")).value.toLowerCase();
    let tmp = []
    for(let o of this.memberData){
      if(o.fullName.toLowerCase().indexOf(filter) != -1 ){
        tmp.push(o)
      }
    }
    this.memberRawData = tmp;
  }

  onNoMemberFilterChanged() {
    let filter = (<HTMLInputElement>document.getElementById("noMemberFilter")).value.toLowerCase();
    let tmp = []
    for(let o of this.noMemberData){
      if(o.fullName.toLowerCase().indexOf(filter) != -1 ){
        tmp.push(o)
      }
    }
    this.noMemberRawData = tmp;
  }

  addMember(id: number){
    this.objectService.requestSent()
    this.groupService.putUserToGroup(id, this.group.id).subscribe(
      (val) => {
        this.objectService.responseMessage(val)
        this.readMembers()
      }
    )
  }
  deleteMember(id: number){
    this.objectService.requestSent()
    this.groupService.deletUserFromGroup(id, this.group.id).subscribe(
      (val) => {
        this.objectService.responseMessage(val)
        this.readMembers()
      }
    )
  }

  readMembers() {
    this.groupService.getMembers(this.group.id).subscribe(
      (val) => {
        this.memberData = val
        this.memberRawData = val
        this.groupService.getAvailiableMembers(this.group.id).subscribe(
          (val) => {
            this.noMemberData = val;
            this.noMemberRawData = val;
          }
        )
      }
    );
  }
}
