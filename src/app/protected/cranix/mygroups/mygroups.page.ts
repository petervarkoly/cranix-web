import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { GridApi } from 'ag-grid-community';
import { PopoverController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

//own modules
import { ActionsComponent } from 'src/app/shared/actions/actions.component';
import { GroupActionBTNRenderer } from 'src/app/pipes/ag-group-renderer';
import { ObjectsEditComponent } from 'src/app/shared/objects-edit/objects-edit.component';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { Group, GuestUsers, Room, User } from 'src/app/shared/models/data-model'
import { AuthenticationService } from 'src/app/services/auth.service';
import { GroupMembersPage } from 'src/app/shared/actions/group-members/group-members.page';
import { EductaionService } from 'src/app/services/education.service';
import { YesNoBTNRenderer } from 'src/app/pipes/ag-yesno-renderer';
import { DateTimeCellRenderer } from 'src/app/pipes/ag-datetime-renderer';
import { EditBTNRenderer } from 'src/app/pipes/ag-edit-renderer';
import { CranixNoticesComponent } from 'src/app/shared/cranix-notices/cranix-notices.component';
import { UserActionBTNRenderer } from 'src/app/pipes/ag-user-renderer';

@Component({
  selector: 'cranix-mygroups',
  templateUrl: './mygroups.page.html',
  styleUrls: ['./mygroups.page.scss'],
})
export class MyGroupsPage implements OnInit {
  segment: string = 'education/group';
  objectKeys: string[] = [];
  columnDefs = [];
  defaultColDef = {};
  gridApi: GridApi;
  rowSelection;
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
    this.defaultColDef = {
      resizable: true,
      sortable: true,
      hide: false,
      suppressHeaderMenuButton: true
    }
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
    this.groupColumnDefs();
  }

  segmentChanged(event) {
    this.segment = event.detail.value;
    switch (this.segment) {
      case 'education/group': { this.groupColumnDefs(); break; }
      case 'education/user': { this.userColumnDefs(); break; }
      case 'education/guestUser': { this.guestColumnDefs(); break; }
    }
  }

  groupColumnDefs() {
    if (this.authService.isMD()) {
      this.rowData = this.objectService.allObjects['education/group'];
    }
    this.columnDefs = [
      {
        field: 'id',
        hide: true
      },
      {
        field: 'name',
        headerName: this.languageS.trans('groupName'),
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: this.authService.settings.checkboxSelection,
        minWidth: 150,
        suppressSizeToFit: true,
      },
      {
        headerName: "",
        minWidth: 200,
        suppressSizeToFit: true,
        cellStyle: { 'padding': '2px' },
        field: 'actions',
        cellRenderer: GroupActionBTNRenderer
      },
      {
        field: 'description',
        minWidth: 250,
        headerName: this.languageS.trans('description')
      },
      {
        field: 'groupType',
        minWidth: 150,
        headerName: this.languageS.trans('groupType'),
        hide: false,
        valueGetter: function (params) {
          return params.context['componentParent'].languageS.trans(params.data.groupType);
        }
      }
    ];
  }

  userColumnDefs() {
    if (this.authService.isMD()) {
      this.rowData = this.objectService.allObjects['education/user'];
    }
    this.columnDefs = [
      {
        field: 'groupName',
        headerName: this.languageS.trans('groupName'),
        minWidth: 150,
        headerCheckboxSelectionFilteredOnly: true,
        headerCheckboxSelection: true,
        checkboxSelection: this.authService.settings.checkboxSelection
      },
      {
        headerName: "",
        minWidth: 200,
        suppressSizeToFit: true,
        cellStyle: { 'padding': '2px' },
        field: 'actions',
        cellRenderer: UserActionBTNRenderer
      },
      {
        field: 'uid',
        sortable: true,
        headerName: this.languageS.trans('uid')
      },
      {
        field: 'givenName',
        sortable: true,
        headerName: this.languageS.trans('givenName')
      },
      {
        field: 'surName',
        sortable: true,
        headerName: this.languageS.trans('surName')
      }
    ];
  }

  guestColumnDefs() {
    if (this.authService.isMD()) {
      this.rowData = this.objectService.allObjects['education/guestUser'];
    }
    this.columnDefs = [
      {
        field: 'id',
        hide: true
      },
      {
        field: 'name',
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: this.authService.settings.checkboxSelection,
        minWidth: 150,
        suppressSizeToFit: true,
      },
      {
        headerName: "",
        minWidth: 150,
        suppressSizeToFit: true,
        cellStyle: { 'padding': '2px' },
        field: 'actions',
        cellRenderer: EditBTNRenderer
      },
      {
        field: 'description',
        minWidth: 250,
        headerName: this.languageS.trans('description')
      },
      {
        headerName: this.languageS.trans('count'),
        field: 'count'
      },
      {
        headerName: this.languageS.trans('private'),
        field: 'privateGroup',
        cellRenderer: YesNoBTNRenderer
      },
      {
        headerName: this.languageS.trans('AdHoc-Room'),
        field: 'createAdHocRoom',
        cellRenderer: YesNoBTNRenderer
      },
      {
        headerName: this.languageS.trans('validUntil'),
        field: 'validUntil',
        cellRenderer: DateTimeCellRenderer
      }
    ];
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
  checkChange(ev, obj) {
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
    if (this.authService.isMD()) {
      this.rowData = [];
      switch (this.segment) {
        case 'education/group': {
          for (let obj of this.objectService.allObjects['education/group']) {
            if (
              obj.name.toLowerCase().indexOf(filter) != -1 ||
              obj.description.toLowerCase().indexOf(filter) != -1 ||
              this.languageS.trans(obj.groupType).toLowerCase().indexOf(filter) != -1
            ) {
              this.rowData.push(obj)
            }
          }
          break;
        }
        case 'education/user': {
          for (let obj of this.objectService.allObjects['education/user']) {
            if (
              obj.uid.toLowerCase().indexOf(filter) != -1 ||
              obj.givenName.toLowerCase().indexOf(filter) != -1 ||
              obj.surName.toLowerCase().indexOf(filter) != -1 ||
              (obj.classes && obj.classes.toLowerCase().indexOf(filter) != -1)
            ) {
              this.rowData.push(obj)
            }
          }
          break;
        }
        case 'education/guestUser': {
          for (let obj of this.objectService.allObjects['education/guestUser']) {
            if (
              obj.name.toLowerCase().indexOf(filter) != -1 ||
              obj.description.toLowerCase().indexOf(filter) != -1
            ) {
              this.rowData.push(obj)
            }
          }
          break;
        }
      }

    } else {
      this.gridApi.setGridOption('quickFilterText', filter);
    }
  }
  public redirectToDelete = (tmp) => {
    this.objectService.deleteObjectDialog(tmp, this.segment, '')
  }
  /**
  * Open the actions menu with the selected object ids.
  * @param ev
  */
  async openActions(ev: any, object) {
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
        objectType: this.segment,
        objectIds: this.objectService.selectedIds,
        selection: this.objectService.selection,
        gridApi: this.gridApi
      },
      animated: true,
      showBackdrop: true
    });
    (await popover).present();
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
    modal.onDidDismiss().then((dataReturned) => {
      this.gridApi.deselectAll();
      if (dataReturned.data) {
        this.authService.log("Object was created or modified", dataReturned.data)
      }
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
    modal.onDidDismiss().then((dataReturned) => {
      switch (this.segment) {
        case 'education/group': { this.groupColumnDefs(); break; }
        case 'education/user': { this.userColumnDefs(); break; }
        case 'education/guestUser': { this.guestColumnDefs(); break; }
      }
      if (dataReturned.data) {
        this.authService.log("Object was created or modified", dataReturned.data)
      }
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

  async openNotice(object) {
    let objectType = this.segment == "education/user" ? "user" : "group"
    const modal = await this.modalCtrl.create({
      component: CranixNoticesComponent,
      componentProps: {
        selectedObject: object,
        objectType: objectType
      },
      cssClass: 'big-modal'
    })
    modal.present();
  }
}

@Component({
  selector: 'cranix-add-edit-guest',
  templateUrl: './add-edit-guest.html'
})
export class AddEditGuestPage implements OnInit {

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

  ngOnInit() {
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

