import { Component, OnInit } from '@angular/core';
import { GridApi } from 'ag-grid-community';
import { PopoverController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

//own modules
import { ActionsComponent } from 'cranix-common';
import { UserActionBTNRenderer } from 'cranix-common';
import { ObjectsEditComponent } from 'cranix-common';
import { GenericObjectService } from 'cranix-common';
import { LanguageService } from 'cranix-common';
import { SelectColumnsComponent } from 'cranix-common';
import { User } from 'cranix-common'
import { AuthenticationService } from 'cranix-common';
import { UserGroupsPage } from '../details/groups/user-groups.page';
import { SystemService } from 'cranix-common';
import { CranixNoticesComponent } from 'cranix-common';

@Component({     standalone: false,
  selector: 'cranix-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
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
  displayedColumns: string[] = ['uid', 'uuid', 'givenName', 'surName', 'role', 'classes', 'actions'];
  columnDefs = [];
  defaultColDef = {};
  gridApi: GridApi;
  context;
  rowData = [];
  defaultMustChange: boolean = true;
  useNotice: boolean = false;
  constructor(
    public authService: AuthenticationService,
    public objectService: GenericObjectService,
    public modalCtrl: ModalController,
    private modalController: ModalController,
    public popoverCtrl: PopoverController,
    public languageS: LanguageService,
    private systemService: SystemService,
    private storage: Storage
  ) {
    this.context = { componentParent: this };
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
    this.useNotice = this.authService.isAllowed('notice.use')
    console.log(this.useNotice)
  }

  async ngOnInit() {
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
    console.log(this.columnDefs)
  }
  async openNotice(object) {
    const modal = await this.modalController.create({
      component: CranixNoticesComponent,
      componentProps: {
        selectedObject: object,
        objectType: "user"
      },
      cssClass: 'big-modal'
    })
    modal.present();
  }
  onGridReady(params) {
    this.gridApi = params.api;
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
    this.gridApi.setGridOption('quickFilterText', filter);
  }

  redirectToDelete = (user: User) => {
    this.objectService.deleteObjectDialog(user, 'user', '')
  }

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
    (await modal).present();
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
