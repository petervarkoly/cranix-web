import { Component, OnInit } from '@angular/core';
import { GridApi, ColumnApi } from 'ag-grid-community';
import { PopoverController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

//own modules
import { ActionsComponent } from 'src/app/shared/actions/actions.component';
import { UserActionBTNRenderer } from 'src/app/pipes/ag-user-renderer';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { SelectColumnsComponent } from 'src/app/shared/select-columns/select-columns.component';
import { User } from 'src/app/shared/models/data-model'
import { AuthenticationService } from 'src/app/services/auth.service';
import { UserGroupsPage } from '../details/groups/user-groups.page';
import { SystemService } from 'src/app/services/system.service';

@Component({
  selector: 'cranix-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  addEditUserOpen: boolean = false;
  addEditTitle: string = "Add user";
  disable: boolean = false;
  objectKeys: string[] = [];
  displayedColumns: string[] = ['uid', 'uuid', 'givenName', 'surName', 'role', 'actions'];
  columnDefs = [];
  defaultColDef = {};
  gridApi: GridApi;
  columnApi: ColumnApi;
  context;
  rowData = [];
  defaultMustChange: boolean = true;
  selectedUser: User;
  roles: Role[];
  constructor(
    public authService: AuthenticationService,
    public objectService: GenericObjectService,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public languageS: LanguageService,
    private systemService: SystemService,
    private storage: Storage
  ) {
    this.context = { componentParent: this };
    this.objectKeys = Object.getOwnPropertyNames(new User());
    this.createColumnDefs();
    this.defaultColDef = {
      resizable: true,
      sortable: true,
      hide: false,
      suppressHeaderMenuButton: true
    }
    this.systemService.getSystemConfigValue("DEFAULT_MUST_CHANGE").subscribe(
      (val) => {
        if (val == "no") {
          this.defaultMustChange = false
        }
      }
    )
  }
  async ngOnInit() {
    this.roles = [];
    this.storage.get('UsersPage.displayedColumns').then((val) => {
      let myArray = JSON.parse(val);
      if (myArray) {
        this.displayedColumns = myArray.concat(['actions']);
        this.createColumnDefs();
      }
    });
    while (!this.objectService.allObjects['user']) {
      await new Promise(f => setTimeout(f, 1000));
    }
    for (let g of this.objectService.allObjects['group']) {
      if (g.groupType == 'primary') {
        this.roles.push({ role: g.name.toLowerCase(), desc: g.description })
      }
    }
    this.rowData = this.objectService.allObjects['user']
  }


  createColumnDefs() {
    let columnDefs = [];
    for (let key of this.objectKeys) {
      let col = {};
      col['field'] = key;
      col['headerName'] = this.languageS.trans(key);
      col['hide'] = (this.displayedColumns.indexOf(key) == -1);
      switch (key) {
        case 'uid': {
          col['headerCheckboxSelection'] = this.authService.settings.headerCheckboxSelection;
          col['headerCheckboxSelectionFilteredOnly'] = true;
          col['checkboxSelection'] = this.authService.settings.checkboxSelection;
          col['minWidth'] = 170;
          col['suppressSizeToFit'] = true;
          col['pinned'] = 'left';
          col['flex'] = '1';
          col['colId'] = '1';
          columnDefs.push(col);
          columnDefs.push({
            headerName: "",
            minWidth: 180,
            suppressSizeToFit: true,
            cellStyle: { 'padding': '2px', 'line-height': '36px' },
            field: 'actions',
            pinned: 'left',
            cellRenderer: UserActionBTNRenderer
          });
          continue;
        }
      }
      columnDefs.push(col);
    }
    this.columnDefs = columnDefs;
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  selectionChanged() {
    this.objectService.selectedIds = []
    for (let i = 0; i < this.gridApi.getSelectedRows().length; i++) {
      this.objectService.selectedIds.push(this.gridApi.getSelectedRows()[i].id);
    }
    this.objectService.selection = this.gridApi.getSelectedRows()
  }

  checkChange(ev, obj: User) {
    if (ev.detail.checked) {
      this.objectService.selectedIds.push(obj.id)
      this.objectService.selection.push(obj)
    } else {
      this.objectService.selectedIds = this.objectService.selectedIds.filter(id => id != obj.id)
      this.objectService.selection = this.objectService.selection.filter(obj => obj.id != obj.id)
    }
  }
  onQuickFilterChanged(quickFilter) {
    let filter = (<HTMLInputElement>document.getElementById(quickFilter)).value.toLowerCase();
    this.gridApi.setQuickFilter(filter);
  }
  public redirectToDelete = (user: User) => {
    this.objectService.deleteObjectDialog(user, 'user', '')
  }
  /**
 * Open the actions menu with the selected object ids.
 * @param ev
 */
  async openActions(ev: any, object: User) {
    if (object) {
      this.objectService.selectedIds.push(object.id)
      this.objectService.selection.push(object)
    } else {
      if (this.objectService.selection.length == 0) {
        this.objectService.selectObject();
        return;
      }
    }
    const popover = await this.popoverCtrl.create({
      component: ActionsComponent,
      event: ev,
      componentProps: {
        objectType: "user",
        objectIds: this.objectService.selectedIds,
        selection: this.objectService.selection,
        gridApi: this.gridApi
      },
      translucent: true,
      animated: true,
      showBackdrop: true
    });
    await popover.present();
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
    if (!user) {
      this.selectedUser = new User();
      this.selectedUser.mustChange = this.defaultMustChange;
      delete this.selectedUser.msQuotaUsed;
      delete this.selectedUser.fsQuotaUsed;
      delete this.selectedUser.mailAliases;
      delete this.selectedUser.classes;
      this.addEditTitle = "Add user";
    } else {
      this.selectedUser = user;
      this.addEditTitle = "Edit user";
    }
    this.addEditUserOpen = true;
  }

  addEditUser(){
    this.disable = true;
    this.objectService.requestSent();
    this.sendRequest().subscribe({
      next: (val) => {
        this.objectService.responseMessage(val)
        if(val.code == "OK") {
          this.addEditUserOpen = false
          this.selectedUser = null
        }
      },
      error: (err) => {
        this.objectService.errorMessage(err)
      },
      complete:() => {
        this.disable = false;
      }
    })
  }
  sendRequest(){
    if(this.selectedUser.id){
     return this.objectService.modifyObject(this.selectedUser, "user")
    }else{
      return this.objectService.addObject(this.selectedUser, "user")
    }
  }
  /**
  * Function to Select the columns to show
  * @param ev
  */
  async openCollums(ev: any) {
    const modal = await this.modalCtrl.create({
      component: SelectColumnsComponent,
      componentProps: {
        columns: this.objectKeys,
        selected: this.displayedColumns,
        objectPath: "UsersPage.displayedColumns"
      },
      animated: true,
      backdropDismiss: false
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data) {
        this.displayedColumns = (dataReturned.data).concat(['actions']);
        this.createColumnDefs();
      }
    });
    (await modal).present().then((val) => {
      this.authService.log("most lett vegrehajtva.")
    })
  }
}

export interface Role {
	role: string,
	desc: string
}
