import { Component, OnInit } from '@angular/core';
import { GridApi } from 'ag-grid-community';
import { PopoverController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

//own modules
import { ActionsComponent } from 'src/app/shared/actions/actions.component';
import { RoomActionBTNRenderer } from 'src/app/pipes/ag-room-renderer';
import { ObjectsEditComponent } from 'src/app/shared/objects-edit/objects-edit.component';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { SelectColumnsComponent } from 'src/app/shared/select-columns/select-columns.component';
import { Room } from 'src/app/shared/models/data-model';
import { AuthenticationService } from 'src/app/services/auth.service';
import { RoomPrintersPage } from '../details/printers/room-printers.page';
import { ManageDhcpComponent } from 'src/app/shared/actions/manage-dhcp/manage-dhcp.component';

@Component({
  selector: 'cranix-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  objectKeys: string[] = [ 'id', 'name', 'ignoreNetbios', 'description', 'roomControl', 'hwconfId', 'startIP', 'devCount', 'roomType', 'network', 'places', 'rows' ]
  displayedColumns: string[] = ['name', 'description', 'roomType', 'roomControl', 'hwconfId', 'actions'];
  sortableColumns: string[] = ['name', 'description', 'roomType', 'roomControl', 'hwconfId'];
  columnDefs = [];
  gridApi: GridApi;
  defaultColDef = {};
  context;

  constructor(
    public authService: AuthenticationService,
    public objectService: GenericObjectService,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public languageS: LanguageService,
    public route: Router,
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
  }
  ngOnInit() {
    this.storage.get('RoomsComponent.displayedColumns').then((val) => {
      let myArray = JSON.parse(val);
      if (myArray) {
        this.displayedColumns = myArray.concat(['actions']);
        this.createColumnDefs();
      }
    });
    delete this.objectService.selectedObject;
  }
  public ngAfterViewInit() {
    while (document.getElementsByTagName('mat-tooltip-component').length > 0) { document.getElementsByTagName('mat-tooltip-component')[0].remove(); }
  }
  createColumnDefs() {
    this.columnDefs = [];
    for (let key of this.objectKeys) {
      let col = {};
      col['field'] = key;
      col['headerName'] = this.languageS.trans(key);
      col['hide'] = (this.displayedColumns.indexOf(key) == -1);
      col['sortable'] = (this.sortableColumns.indexOf(key) != -1);
      switch (key) {
        case 'name': {
          col['headerCheckboxSelection'] = this.authService.settings.headerCheckboxSelection;
          col['headerCheckboxSelectionFilteredOnly'] = true;
          col['checkboxSelection'] = this.authService.settings.checkboxSelection;
          col['minWidth'] = 180;
          col['suppressSizeToFit'] = true;
          col['pinned'] = 'left';
          col['flex'] = '1';
          col['colId'] = '1';
          this.columnDefs.push(col);
          this.columnDefs.push({
            headerName: "",
            minWidth: 280,
            suppressSizeToFit: true,
            cellStyle: { 'padding': '1px', 'line-height': '36px' },
            field: 'actions',
            pinned: 'left',
            cellRenderer: RoomActionBTNRenderer
          });
          continue;
        }
        case 'hwconfId': {
          col['valueGetter'] = function (params) {
            return params.context['componentParent'].objectService.idToName('hwconf', params.data.hwconfId);
          }
          break;
        }
      }
      this.columnDefs.push(col);
    }
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
  onQuickFilterChanged(quickFilter) {
    let filter = (<HTMLInputElement>document.getElementById(quickFilter)).value.toLowerCase();
    this.gridApi.setGridOption('quickFilterText', filter);
  }
  public redirectToDelete = (room: Room) => {
    this.objectService.deleteObjectDialog(room, 'room', '')
  }
  /**
 * Open the actions menu with the selected object ids.
 * @param ev
 */
  async openActions(ev: any, object: Room) {
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
        objectType: "room",
        objectIds: this.objectService.selectedIds,
        selection: this.objectService.selection,
        gridApi: this.gridApi
      },
      animated: true,
      showBackdrop: true
    });
    (await popover).present();
  }

  async redirectToEdit(room: Room) {
    let action = "";
    if (room) {
      delete room.accessInRooms;
      this.objectService.selectedObject = room;
      action = 'modify';
    } else {
      action = "add";
      room = new Room;
      room.network = this.objectService.selects['network'][0];
      delete room.accessInRooms;
      delete room.netMask;
      delete room.startIP;
      room.devCount = 32;
      //TODO set defaults configurable
      room.roomControl = 'allTeachers'
      room.roomType = 'ComputerRoom'
      room.hwconfId = 4
    }
    const modal = await this.modalCtrl.create({
      component: ObjectsEditComponent,
      cssClass: 'medium-modal',
      componentProps: {
        objectType: "room",
        objectAction: action,
        object: room,
        objectKeys: this.objectKeys
      },
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

  async setDhcp(room: Room) {
    this.objectService.selectedObject = room;
    const modal = await this.modalCtrl.create({
      component: ManageDhcpComponent,
      componentProps: {
        objectType: "room",
        object: room
      },
      animated: true,
      backdropDismiss: false
    });
    (await modal).present();
  }

  async setPrinters(room: Room) {
    this.objectService.selectedObject = room;
    const modal = await this.modalCtrl.create({
      component: RoomPrintersPage,
      cssClass: "small-modal",
      animated: true,
      backdropDismiss: false
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data) {
        this.displayedColumns = dataReturned.data.concat(['actions']);
      }
      this.createColumnDefs();
    });
    (await modal).present().then((val) => {
      this.authService.log("most lett vegrehajtva.")
    })
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
        objectPath: "RoomsComponent.displayedColumns"
      },
      animated: true,
      backdropDismiss: false
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data) {
        this.displayedColumns = dataReturned.data.concat(['actions']);
        this.createColumnDefs();
      }
    });
    (await modal).present().then((val) => {
      this.authService.log("most lett vegrehajtva.")
    })
  }

  public devices(room: Room) {
    this.objectService.selectedRoom = room;
    this.route.navigate(['/pages/cranix/devices']);
  }
}
