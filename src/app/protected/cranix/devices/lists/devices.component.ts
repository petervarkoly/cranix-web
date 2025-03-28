import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

//own modules
import { ActionsComponent } from 'src/app/shared/actions/actions.component';
import { DeviceActionBTNRenderer } from 'src/app/pipes/ag-device-renderer';
import { ObjectsEditComponent } from 'src/app/shared/objects-edit/objects-edit.component';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { SelectColumnsComponent } from 'src/app/shared/select-columns/select-columns.component';
import { Device } from 'src/app/shared/models/data-model'
import { AuthenticationService } from 'src/app/services/auth.service';
import { DevicePrintersComponent } from './../details/printers/device-printers.component';
import { AddDeviceComponent } from './../add-device/add-device.component';
import { ManageDhcpComponent } from 'src/app/shared/actions/manage-dhcp/manage-dhcp.component';

@Component({
  selector: 'cranix-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent implements OnInit {
  selectedRoom;
  objectKeys: string[] = [
    "roomId",
    "name",
    "ip",
    "mac",
    "wlanIp",
    "wlanMac",
    "hwconfId",
    "place",
    "row",
    "serial",
    "inventary",
    "locality",
    "created",
    "modified"
  ]
  displayedColumns: string[] = ['name', 'mac', 'ip', 'hwconfId', 'roomId'];
  sortableColumns: string[] = ['name', 'mac', 'ip', 'hwconfId', 'roomId'];
  columnDefs = [];
  defaultColDef = {};
  gridApi;
  columnApi;
  context;
  title = 'app';
  rowData = [];
  selection: Device[] = [];
  selectedIds: number[] = [];

  constructor(
    public authService: AuthenticationService,
    public alertController: AlertController,
    public languageS: LanguageService,
    public modalCtrl: ModalController,
    public objectService: GenericObjectService,
    public popoverCtrl: PopoverController,
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
    this.storage.get('DevicesComponent.displayedColumns').then((val) => {
      let myArray = JSON.parse(val);
      if (myArray) {
        this.displayedColumns = myArray.concat(['actions']);
        this.createColumnDefs();
      }
    });
    if (this.objectService.selectedRoom) {
      this.selectedRoom = this.objectService.selectedRoom;
      this.rowData = [];
      for (let dev of this.objectService.allObjects['device']) {
        if (dev.roomId == this.selectedRoom.id && dev.hwconfId != 2) {
          this.rowData.push(dev);
        }
      }
    } else {
      this.rowData = this.objectService.allObjects['device'].filter(obj => obj.hwconfId != 2);
      delete this.selectedRoom;
    }
    delete this.objectService.selectedObject;
  }
  ngOnDestroy() {
    console.log("ngOnDestroy")
    delete this.objectService.selectedRoom;
    delete this.objectService.selectedObject;
  }
  public ngAfterViewInit() {
    while (document.getElementsByTagName('mat-tooltip-component').length > 0) { document.getElementsByTagName('mat-tooltip-component')[0].remove(); }
  }

  createColumnDefs() {
    let columnDefs = [];
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
          col['minWidth'] = 170;
          col['suppressSizeToFit'] = true;
          col['pinned'] = 'left';
          col['flex'] = '1';
          col['colId'] = '1';
          columnDefs.push(col);
          columnDefs.push({
            headerName: "",
            minWidth: 240,
            suppressSizeToFit: true,
            cellStyle: { 'padding': '1px', 'line-height': '36px' },
            field: 'actions',
            pinned: 'left',
            cellRenderer: DeviceActionBTNRenderer
          })
          continue;
        }
        case 'hwconfId': {
          col['valueGetter'] = function (params) {
            return params.context['componentParent'].objectService.idToName('hwconf', params.data.hwconfId);
          }
          break;
        }
        case 'roomId': {
          col['valueGetter'] = function (params) {
            return params.context['componentParent'].objectService.idToName('room', params.data.roomId);
          }
          break;
        }
      }
      columnDefs.push(col);
    }
    this.columnDefs = columnDefs;
  }

  onGridReady(params) {
    params.getRowStyle = function (par) {
      if (par.node.rowIndex % 2 === 0) {
        return { background: 'red' };
      }
    }
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  onQuickFilterChanged(quickFilter) {
    let filter = (<HTMLInputElement>document.getElementById(quickFilter)).value.toLowerCase();
    this.gridApi.setGridOption('quickFilterText', filter);
  }
  sizeAll() {
    var allColumnIds = [];
    this.columnApi.getColumns().forEach((column) => {
      allColumnIds.push(column.getColId());
    });
    this.columnApi.autoSizeColumns(allColumnIds);
  }

  redirectToDelete(device: Device) {
    this.objectService.deleteObjectDialog(device, 'device', '')
  }

  selectionChanged() {
    this.objectService.selectedIds = []
    for (let i = 0; i < this.gridApi.getSelectedRows().length; i++) {
      this.objectService.selectedIds.push(this.gridApi.getSelectedRows()[i].id);
    }
    this.objectService.selection = this.gridApi.getSelectedRows()
  }
  checkChange(ev, dev: Device) {
    if (ev.detail.checked) {
      this.objectService.selectedIds.push(dev.id)
      this.objectService.selection.push(dev)
    } else {
      this.objectService.selectedIds = this.objectService.selectedIds.filter(id => id != dev.id)
      this.objectService.selection = this.objectService.selection.filter(obj => obj.id != dev.id)
    }
  }

  /**
 * Open the actions menu with the selected object ids.
 * @param ev
 */
  async openActions(ev: any, object: Device) {
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
        objectType: "device",
        objectIds: this.objectService.selectedIds,
        selection: this.objectService.selection,
        gridApi: this.gridApi
      },
      animated: true,
      showBackdrop: true
    });
    (await popover).present();
  }
  async redirectToEdit(device: Device) {
    let action = "modify";
    if (!device) {
      return this.addDevice(null);
    }
    const modal = await this.modalCtrl.create({
      component: ObjectsEditComponent,
      cssClass: "medium-modal",
      componentProps: {
        objectType: "device",
        objectAction: action,
        objectKeys: this.objectKeys,
        object: device
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
  async setDhcp(device: Device) {
    const modal = await this.modalCtrl.create({
      component: ManageDhcpComponent,
      componentProps: {
        objectType: "device",
        object: device
      },
      animated: true,
      backdropDismiss: false
    });
    (await modal).present();
  }
  async setPrinters(device: Device) {
    this.objectService.selectedObject = device;
    const modal = await this.modalCtrl.create({
      component: DevicePrintersComponent,
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
        objectPath: "DevicesComponent.displayedColumns"
      },
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

  async addDevice(ev: Event) {
    const modal = await this.modalCtrl.create({
      component: AddDeviceComponent,
      cssClass: 'medium-modal',
      componentProps: {
        adHocRoom: false
      },
      animated: true,
      backdropDismiss: false
    });
    (await modal).present().then((val) => {
      this.authService.log("most lett vegrehajtva.")
    })
  }
}
