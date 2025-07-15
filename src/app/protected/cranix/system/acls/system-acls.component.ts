import { Component, OnInit } from '@angular/core';
import { GridApi } from 'ag-grid-community'
import { GenericObjectService } from 'cranix-common';
import { AuthenticationService } from 'cranix-common';
import { ModalController } from '@ionic/angular';
import { LanguageService } from 'cranix-common';
import { TranslateService } from '@ngx-translate/core';
import { ManageAclsComponent } from './manage-acls/manage-acls.component';

@Component({     standalone: false,
  selector: 'cranix-system-acls',
  templateUrl: './system-acls.component.html',
  styleUrls: ['./system-acls.component.scss'],
})
export class SystemAclsComponent implements OnInit {
  context;
  groupsApi: GridApi;
  usersApi: GridApi;
  groupsData = []
  usersData = []
  groupColumnDefs = []
  userColumnDefs = []
  defaultColDef = {
    resizable: true,
    sortable: true,
    hide: false,
    suppressHeaderMenuButton: true
  }

  constructor(public authService: AuthenticationService,
    private objectService: GenericObjectService,
    public modalCtrl: ModalController,
    private languageS: LanguageService,
    public translateServices: TranslateService) { }

  ngOnInit() {
    this.context = { componentParent: this };
    this.groupsData = this.objectService.allObjects['group'];
    this.usersData = this.objectService.allObjects['user'];
    this.groupColumnDefs = [
      {
        headerName: this.languageS.trans('name'),
        field: 'name'
      }, {
        headerName: this.languageS.trans('description'),
        field: 'description'
      }, {
        headerName: this.languageS.trans('groupType'),
        field: 'groupType'
      }
    ]
    this.userColumnDefs = [
      {
        headerName: this.languageS.trans('uid'),
        field: 'uid'
      }, {
        headerName: this.languageS.trans('surName'),
        field: 'surName'
      }, {
        headerName: this.languageS.trans('givenName'),
        field: 'givenName'
      }, {
        headerName: this.languageS.trans('role'),
        field: 'role'
      }
    ]
    console.log(this.groupsData)
  }

  groupRowClickedHandler(event) {
    console.log('Group row was clicked');
    console.log(event);
    event.context['componentParent'].manageAcls('group', event.data)
  }
  userRowClickedHandler(event) {
    console.log('User row was clicked');
    console.log(event);
    event.context['componentParent'].manageAcls('user', event.data)
  }
  async manageAcls(objectType, object) {
    const modal = await this.modalCtrl.create({
      component: ManageAclsComponent,
      animated: true,
      showBackdrop: true, componentProps: {
        objectType: objectType,
        object: object
      }
    });
    (await modal).present();
  }
  groupsReady(params) {
    this.groupsApi = params.api;
    this.groupsApi.sizeColumnsToFit();
    (<HTMLInputElement>document.getElementById("groupsTable")).style.height = Math.trunc(window.innerHeight * 0.65) + "px";
    this.groupsApi.addEventListener('rowClicked', this.groupRowClickedHandler);
  }

  usersReady(params) {
    this.usersApi = params.api;
    this.usersApi.sizeColumnsToFit();
    (<HTMLInputElement>document.getElementById("usersTable")).style.height = Math.trunc(window.innerHeight * 0.65) + "px";
    this.usersApi.addEventListener('rowClicked', this.userRowClickedHandler);
  }
  groupFilterChanged() {
    let filter = (<HTMLInputElement>document.getElementById('groupFilter')).value
    if (this.authService.isMD()) {
      this.groupsData = this.objectService.filterObject('group',filter.toLowerCase())
    } else {
      this.groupsApi.setGridOption('quickFilterText', filter);
    }
  }
  userFilterChanged() {
    let filter = (<HTMLInputElement>document.getElementById('userFilter')).value
    if( this.authService.isMD()) {
      this.usersData = this.objectService.filterObject('user',filter.toLowerCase())
    }else {
    this.usersApi.setGridOption('quickFilterText', filter);
    }
  }
}
