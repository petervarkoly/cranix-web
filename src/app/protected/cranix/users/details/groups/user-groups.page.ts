import { AgGridAngular } from 'ag-grid-angular';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { checkmarkSharp, close } from 'ionicons/icons';
import { IonButtons, IonButton, IonIcon, IonCol, IonTitle, IonInput } from '@ionic/angular/standalone';
import { Component, OnInit } from '@angular/core';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { ModalController } from '@ionic/angular/standalone';

//own stuff
import { LanguageService } from 'src/app/services/language.service';
import { UsersService } from 'src/app/services/users.service';
import { Group, User } from 'src/app/shared/models/data-model'
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
    selector: 'cranix-user-groups',
  imports: [ AgGridAngular, MatTooltipModule, TranslateModule, IonButtons, IonButton, IonIcon, IonCol, IonTitle, IonInput ],
    templateUrl: './user-groups.page.html',
    styleUrls: ['./user-groups.page.scss'],
    standalone: true,
})
export class UserGroupsPage implements OnInit {
  columnDefs = [];
  memberApi;
  noMemberApi;
  memberColumnApi;
  noMemberColumnApi;
  memberSelection: Group[] =[];
  noMemberSelection: Group[] =[];
  memberData: Group[] =[];
  noMemberData: Group[] =[];
  user;

  constructor(
    public authService: AuthenticationService,
    private objectS: GenericObjectService,
    private languageS: LanguageService,
    public modalCtrl: ModalController,
    private  userS: UsersService
  ) {
    addIcons ({ checkmarkSharp, close });
    this.user = <User>this.objectS.selectedObject;
    this.columnDefs = [
      {
        headerName:  this.languageS.trans('name'),
        sortable: true,
        field: 'name',
        headerCheckboxSelection: this.authService.settings.headerCheckboxSelection,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: this.authService.settings.checkboxSelection
      },
      {
        headerName: this.languageS.trans('description'),
        sortable: true,
        field: 'description',
      },
      {
        headerName: this.languageS.trans('groupType'),
        sortable: true,
        field: 'groupType',
      }
    ]
  }

  ngOnInit() {
    this.readGroups();
  }

  onMemberReady(params) {
    this.memberApi = params.api;
    this.memberColumnApi = params.columnApi;
    this.memberApi.sizeColumnsToFit();
    (<HTMLInputElement>document.getElementById("memberTable")).style.height = Math.trunc(window.innerHeight * 0.63) + "px";
  }
  onMemberSelectionChanged() {
    this.memberSelection = this.memberApi.getSelectedRows();
  }

  onMemberFilterChanged() {
    this.memberApi.setGridOption('quickFilterText', (<HTMLInputElement>document.getElementById("memberFilter")).value);
    this.memberApi.doLayout();
  }

  onNoMemberReady(params) {
    this.noMemberApi = params.api;
    this.noMemberColumnApi = params.columnApi;
    this.noMemberApi.sizeColumnsToFit();
    (<HTMLInputElement>document.getElementById("noMemberTable")).style.height = Math.trunc(window.innerHeight * 0.63) + "px";
  }
  onNoMemberSelectionChanged() {
    this.noMemberSelection = this.noMemberApi.getSelectedRows();
  }

  onNoMemberFilterChanged() {
    this.noMemberApi.setGridOption('quickFilterText', (<HTMLInputElement>document.getElementById("noMemberFilter")).value);
    this.noMemberApi.doLayout();
  }
  applyChanges() {
    let groups: number[] = [];
    let rmGroups: number[] = [];
    for ( let g of this.noMemberSelection ) {
      groups.push(g.id);
    }
    for(let g of this.memberSelection) {
      rmGroups.push(g.id);
    }
    
    for( let g of this.memberData ){
      if( rmGroups.indexOf(g.id) == -1) {
        groups.push(g.id)
      }
    }
    this.authService.log('groups');
    this.authService.log(groups);
    this.noMemberSelection = [];
    this.memberSelection = [];
    let subM = this.userS.setUsersGroups(this.user.id,groups).subscribe(
      (val) => { this.readGroups() } ,
      (err)  => { this.authService.log(err)},
      () => { subM.unsubscribe()});
  }

  readGroups() {
    let subM = this.userS.getUsersGroups(this.user.id).subscribe(
      (val) => { this.memberData = val } ,
      (err)  => { this.authService.log(err)},
      () => { subM.unsubscribe()});
    let subNM = this.userS.getUsersAvailableGroups(this.user.id).subscribe(
      (val) => { this.noMemberData = val } ,
      (err)  => { this.authService.log(err)},
      () => { subNM.unsubscribe()})
    }
}
