import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

//own stuff
import { LanguageService } from 'src/app/services/language.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { GroupsService } from 'src/app/services/groups.service';
import { Group, User } from 'src/app/shared/models/data-model'
import { AuthenticationService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'cranix-group-members',
  templateUrl: './group-members.page.html',
  styleUrls: ['./group-members.page.scss'],
})
export class GroupMembersPage implements OnInit {
  context;
  memberOptions;
  noMemberOptions;
  columnDefs = [];
  memberApi;
  noMemberApi;
  memberRowData: User[] = [];
  noMemberRowData: User[] = [];
  memberData: User[] = [];
  noMemberData: User[] = [];
  group;

  constructor(
    public authService: AuthenticationService,
    private objectS: GenericObjectService,
    public modalCtrl: ModalController,
    private languageS: LanguageService,
    private groupS: GroupsService,
    public translateServices: TranslateService
  ) { }

  ngOnInit() {
    console.log('innerWidth', window.innerWidth)
    this.context = { componentParent: this }
    this.group = <Group>this.objectS.selectedObject;
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
    this.memberRowData = tmp;
  }

  onNoMemberFilterChanged() {
    let filter = (<HTMLInputElement>document.getElementById("noMemberFilter")).value.toLowerCase();
    let tmp = []
    for(let o of this.noMemberData){
      if(o.fullName.toLowerCase().indexOf(filter) != -1 ){
        tmp.push(o)
      }
    }
    this.noMemberRowData = tmp;
  }

  addMember(id: number){
    this.objectS.requestSent()
    this.groupS.putUserToGroup(id, this.group.id).subscribe(
      (val) => {
        this.objectS.responseMessage(val)
        this.readMembers()
      }
    )
  }
  deleteMember(id: number){
    this.objectS.requestSent()
    this.groupS.deletUserFromGroup(id, this.group.id).subscribe(
      (val) => {
        this.objectS.responseMessage(val)
        this.readMembers()
      }
    )
  }

  readMembers() {
    this.groupS.getMembers(this.group.id).subscribe(
      (val) => {
        this.memberData = val
        this.memberRowData = val
        this.groupS.getAvailiableMembers(this.group.id).subscribe(
          (val) => {
            this.noMemberData = val;
            this.noMemberRowData = val;
          }
        )
      }
    );
  }
}
