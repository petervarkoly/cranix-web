import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AuthenticationService } from 'src/app/services/auth.service';
import { ChallengesService } from 'src/app/services/challenges.service';
import { CrxObjectService } from 'src/app/services/crx-object-service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { UtilsService } from 'src/app/services/utils.service';
import { GridApi } from 'ag-grid-community';
import type { ColDef, GridOptions } from 'ag-grid-community';
import { ActionBTNRenderer } from 'src/app/pipes/ag-action-renderer';
import { CustomerActionRenderer } from 'src/app/pipes/ag-customer-action-renderer';
import { DeviceActionBTNRenderer } from 'src/app/pipes/ag-device-renderer'
import { GroupActionBTNRenderer } from 'src/app/pipes/ag-group-renderer'
import { InstituteActionCellRenderer } from 'src/app/pipes/ag-institute-action-renderer'
import { PrinterActionBTNRenderer } from 'src/app/pipes/ag-printer-renderer';
import { RoomActionBTNRenderer } from 'src/app/pipes/ag-room-renderer';
import { UserActionBTNRenderer } from 'src/app/pipes/ag-user-renderer';
import { ActionsComponent } from '../actions/actions.component';
import { ModalController, PopoverController } from '@ionic/angular';
import { SelectColumnsComponent } from 'src/app/shared/select-columns/select-columns.component';
import { hiddenColumns } from 'src/app/shared/models/constants';

@Component({
  standalone: false,
  selector: 'cranix-list',
  templateUrl: './cranix-list.component.html',
  styleUrls: ['./cranix-list.component.scss'],
})
export class CranixListComponent implements OnInit {

  addToolTip: string = ""
  columnDefs: ColDef[] = []
  hiddenColumns = hiddenColumns;
  gridApi: GridApi;
  gridOptions: GridOptions = {
    defaultColDef: {
      resizable: true,
      sortable: true,
      hide: false,
      minWidth: 80,
      suppressHeaderMenuButton: true
    },
    rowSelection: {
      mode: 'multiRow',
      selectAll: 'filtered',
      headerCheckbox: true
    }
  }
  listContext: any;
  objectKeys: string[] = [];
  rowData: any[];

  useNotice: boolean = false;
  @Input() objectType: string;
  @Input() context;
  constructor(
    public authService: AuthenticationService,
    private challengeService: ChallengesService,
    public crxObjectService: CrxObjectService,
    public languageService: LanguageService,
    public objectService: GenericObjectService,
    public modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    public route: Router,
    private storage: Storage,
    public utilService: UtilsService
  ) {
    this.listContext = { componentParent: this };
    
    this.authService.log("CranixMdListComponent constructor was called")
    this.utilService.actMdList = this;
    this.useNotice = this.authService.isAllowed('notice.use')
  }

  async ngOnInit() {
    if( this.context.rowData ){
      this.rowData = this.rowData
    }
    this.addToolTip = this.languageService.trans("Create a new " + this.objectType);
    this.storage.get(this.objectType + "_hidden_collums").then((val) => {
      let myArray = JSON.parse(val);
      if (myArray) {
        this.hiddenColumns = myArray;
      }
    });
    while (!this.objectService.allObjects[this.objectType]) {
      await new Promise(f => setTimeout(f, 1000));
    }
    
    if (this.objectService.allObjects[this.objectType][0]) {
      for (const key in this.objectService.allObjects[this.objectType][0]) {
        this.objectKeys.push(key)
      }
    }
    this.createColumnDefs();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  createColumnDefs() {
    let columnDefs = [];
    var cellRenderer;
    switch (this.objectType) {
      case 'customer': {
        cellRenderer = CustomerActionRenderer; break
      }
      case 'device': {
        cellRenderer = DeviceActionBTNRenderer; break
      }
      case 'group': {
        cellRenderer = GroupActionBTNRenderer; break
      }
      case 'institute': {
        cellRenderer = InstituteActionCellRenderer; break
      }
      case 'user': {
        cellRenderer = UserActionBTNRenderer; break
      }
      case 'printer': {
        cellRenderer = PrinterActionBTNRenderer; break
      }
      case 'room': {
        cellRenderer = RoomActionBTNRenderer; break
      }
      default: {
        cellRenderer = ActionBTNRenderer; break
      }
    }
    for (let key of this.objectKeys) {
      let col = {};
      col['field'] = key;
      col['headerName'] = this.languageService.trans(key);
      col['hide'] = (this.hiddenColumns.indexOf(key) != -1);
      switch (key) {
        case 'title':
        case 'name':
        case 'uid': {
          col['minWidth'] = 170;
          col['suppressSizeToFit'] = true;
          col['pinned'] = 'left';
          col['flex'] = '1';
          col['colId'] = '1';
          columnDefs.push(col);
          columnDefs.push({
            headerName: "",
            minWidth: 200,
            suppressSizeToFit: true,
            cellStyle: { 'padding': '2px' },
            field: 'actions',
            pinned: 'left',
            cellRenderer: cellRenderer
          });
          continue;
        }
        case 'created':
        case 'modified': {
          col['valueFormatter'] = params => new Date(params.value).toISOString(); break
        }
        case 'cephalixCustomerId': {
          col['valueFormatter'] = params =>params.context['componentParent'].objectService.idToName('customer', params.data.cephalixCustomerId);break;
        }
        case 'groupId': {
          col['valueFormatter'] = params =>params.context['componentParent'].objectService.idToName('group', params.data.groupId);break;
        }
        case 'groupType': {
          col['valueFormatter'] = params =>params.context['componentParent'].languageService.trans(params.data.groupType);break;
        }
        case 'instituteType': {
          col['valueFormatter'] = params =>params.context['componentParent'].languageService.trans(params.data.instituteType);break;
        }
        case 'hwconfId': {
          col['valueFormatter'] = params => params.context['componentParent'].objectService.idToName('hwconf', params.data.hwconfId); break;
        }
        case 'roomId': {
          col['valueFormatter'] = params =>params.context['componentParent'].objectService.idToName('room', params.data.roomId);break;
        }
        case 'roomControl': {
          col['valueFormatter'] = params =>params.context['componentParent'].languageService.trans(params.data.roomControl);break;
        }
        case 'role': {
          col['valueFormatter'] = params =>params.context['componentParent'].languageService.trans(params.data.role);break;
        }
        
      }
      columnDefs.push(col);
    }
    this.columnDefs = columnDefs;
    console.log(columnDefs)
  }

  onQuickFilterChanged() {
    let filter = (<HTMLInputElement>document.getElementById('quickFilter')).value.toLowerCase();
    this.gridApi.setGridOption('quickFilterText', filter);
  }

  getSelection() {
    this.objectService.selectedIds = []
    for (let i = 0; i < this.gridApi.getSelectedRows().length; i++) {
      this.objectService.selectedIds.push(this.gridApi.getSelectedRows()[i].id);
    }
    this.objectService.selection = this.gridApi.getSelectedRows()
  }

  redirectToAddInstitute(){
    let selection = this.gridApi.getSelectedRows();
    if (!selection) {
      this.objectService.selectObject();
      return;
    }
    this.context.componentParent.redirectToAddInstitute(selection[0])
  }
  
  addPrinter() {
    this.context.componentParent.addPrinter();
  }
  redirectToDelete = (object) => {
    this.objectService.deleteObjectDialog(object, this.objectType, '')
  }

  async redirectToMembers(object) {
    this.context.componentParent.redirectToMembers(object);
  }

  async redirectToGroups(object) {
    this.context.componentParent.redirectToGroups(object);
  }

  async redirectToEdit(object) {
    this.context.componentParent.redirectToEdit(object);
  }

  async setDhcp(object) {
    this.context.componentParent.setDhcp(object);
  }
  async setPrinters(object) {
    this.context.componentParent.setPrinters(object);
  }
  devices(object){
    this.context.componentParent.devices(object);
  }

  async openActions(ev: any, object: any) {
    if (object) {
      this.objectService.selectedIds = [object.id]
      this.objectService.selection = [object]
    } else {
      this.getSelection();
      if (this.objectService.selection.length == 0) {
        this.objectService.selectObject();
        return;
      }
    }
    const popover = await this.popoverCtrl.create({
      component: ActionsComponent,
      event: ev,
      componentProps: {
        objectType: this.objectType,
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

  async openCollums(ev: any) {
    const modal = await this.modalCtrl.create({
      component: SelectColumnsComponent,
      componentProps: {
        columns: this.objectKeys,
        selected: this.hiddenColumns,
        objectPath: this.objectType + "_hidden_collumns"
      },
      animated: true,
      backdropDismiss: false
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data) {
        this.hiddenColumns = (dataReturned.data);
        this.createColumnDefs();
      }
    });
    (await modal).present()
  }
}
