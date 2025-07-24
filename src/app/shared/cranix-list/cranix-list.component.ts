import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
import { hiddenColumns, getObjectKeys } from 'src/app/shared/models/constants';
import { YesNoBTNRenderer } from 'src/app/pipes/ag-yesno-renderer';
import { CranixNoticesComponent } from '../cranix-notices/cranix-notices.component';
import { EditBTNRenderer } from 'src/app/pipes/ag-edit-renderer';
import { UpdateRenderer } from 'src/app/pipes/ag-update-renderer';
import { FileSystemUsageRenderer } from 'src/app/pipes/ag-filesystem-usage-renderer';
import { SoftwareEditBTNRenderer } from 'src/app/pipes/ag-software-edit-renderer';
import { SoftwareService } from 'src/app/services/softwares.service';

@Component({
  standalone: false,
  selector: 'cranix-list',
  templateUrl: './cranix-list.component.html',
  styleUrls: ['./cranix-list.component.scss'],
})
export class CranixListComponent implements OnInit, OnChanges {

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

  useNotice: boolean = false;
  @Input({ required: true }) objectType: string;
  @Input() context;
  @Input() rowData;
  constructor(
    public authService: AuthenticationService,
    public crxObjectService: CrxObjectService,
    public languageService: LanguageService,
    public objectService: GenericObjectService,
    public modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    public route: Router,
    public softwareService: SoftwareService,
    private storage: Storage,
    public utilService: UtilsService
  ) {
    this.listContext = { componentParent: this };
    this.authService.log("CranixMdListComponent constructor was called")
    this.utilService.actMdList = this;
    this.useNotice = this.authService.isAllowed('notice.use')
  }

  async ngOnInit() {
    console.log(this.objectType, this.objectKeys, this.columnDefs)
    this.addToolTip = this.languageService.trans("Create a new " + this.objectType);
    let val = await this.storage.get(this.objectType + "_hidden_collums");
    let myArray = JSON.parse(val);
    if (myArray) {
      this.hiddenColumns = myArray;
    }
    if (typeof this.rowData == "undefined") {
      while (!this.objectService.allObjects[this.objectType]) {
        await new Promise(f => setTimeout(f, 1000));
      }
    }
    this.objectKeys = getObjectKeys(this.objectType);
    this.createColumnDefs();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    this.ngOnInit()
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
      case 'education/group':
      case 'group': {
        cellRenderer = GroupActionBTNRenderer; break
      }
      case 'education/guestUser': {
        cellRenderer = EditBTNRenderer; break
      }
      case 'institute': {
        cellRenderer = InstituteActionCellRenderer; break
      }
      case 'education/user':
      case 'user': {
        cellRenderer = UserActionBTNRenderer; break
      }
      case 'printer': {
        cellRenderer = PrinterActionBTNRenderer; break
      }
      case 'room': {
        cellRenderer = RoomActionBTNRenderer; break
      }
      case 'package': {
        cellRenderer = SoftwareEditBTNRenderer; break
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
        case 'moday': case 'tuesday': case 'wednesday': case 'thursday': case 'friday': case 'saturday': case 'sunday':
        case 'holiday': case 'apply_default':
        case 'direct': case 'login': case 'portal': case 'printing': case 'proxy':
        case 'ignoreNetbios':
        case 'createAdHocRoom': case 'privateGroup': case 'studentsOnly':
          {
            col['cellRenderer'] = YesNoBTNRenderer; break
          }
        case 'created': case 'modified':
        case 'validFrom': case 'validUntil':
        case 'lastUpdate':
          {
            col['valueFormatter'] = params => new Date(params.value).toISOString().substring(0, 16); break
          }
        case 'cephalixCustomerId': {
          col['valueFormatter'] = params => params.context['componentParent'].objectService.idToName('customer', params.data.cephalixCustomerId); break;
        }
        case 'cephalixInstituteId': {
          col['valueFormatter'] = params => params.context['componentParent'].objectService.idToName('institute', params.data.cephalixInstituteId); break;
        }
        case 'groupId': {
          col['valueFormatter'] = params => params.context['componentParent'].objectService.idToName('group', params.data.groupId); break;
        }
        case 'groupType': {
          col['valueFormatter'] = params => params.context['componentParent'].languageService.trans(params.data.groupType); break;
        }
        case 'instituteType': {
          col['valueFormatter'] = params => params.context['componentParent'].languageService.trans(params.data.instituteType); break;
        }
        case 'hwconfId': {
          col['valueFormatter'] = params => params.context['componentParent'].objectService.idToName('hwconf', params.data.hwconfId); break;
        }
        case 'roomId': {
          col['valueFormatter'] = params => params.context['componentParent'].objectService.idToName('room', params.data.roomId); break;
        }
        case 'roomControl': {
          col['valueFormatter'] = params => params.context['componentParent'].languageService.trans(params.data.roomControl); break;
        }
        case 'role': {
          col['valueFormatter'] = params => params.context['componentParent'].languageService.trans(params.data.role); break;
        }
        case 'deviceIds': {
          col['valueFormatter'] = params => params.data.deviceIds ? params.data.deviceIds.length : 0; break;
        }
        case 'groupIds': {
          col['valueFormatter'] = params => params.data.groupIds ? params.data.groupIds.length : 0; break;
        }
        case 'hwconfIds': {
          col['valueFormatter'] = params => params.data.hwconfIds ? params.data.hwconfIds.length : 0; break;
        }
        case 'roomIds': {
          col['valueFormatter'] = params => params.data.roomIds ? params.data.roomIds.length : 0; break;
        }
        case 'userIds': {
          col['valueFormatter'] = params => params.data.userIds ? params.data.userIds.length : 0; break;
        }
        case 'availableUpdates': {
          col['width'] = 60
          col['cellRenderer'] = UpdateRenderer;
          break;
        }
        case 'rootUsage': {
          col['cellRenderer'] = FileSystemUsageRenderer;
          break;
        }
        case 'homeUsage': {
          col['cellRenderer'] = FileSystemUsageRenderer;
          break;
        }
        case 'srvUsage': {
          col['cellRenderer'] = FileSystemUsageRenderer;
          break;
        }
        case 'varUsage': {
          col['cellRenderer'] = FileSystemUsageRenderer;
          break;
        }
        case 'version': {
          col['valueGetter'] = function (params) {
            if (params.data.softwareVersions && params.data.softwareVersions.length > 0) {
              return params.data.softwareVersions[0].version;
            }else{
              return ""
            }
          }
          break;
        }
        case 'runningKernel': {
          col['width'] = 60
          col['valueGetter'] = function (params) {
            let index = params.data.runningKernel.indexOf("-default");
            let run = params.data.runningKernel.substring(0, index);
            let inst = params.data.installedKernel.substring(0, index);
            if (run == inst) {
              return "OK"
            } else {
              return "reboot"
            }
          }
          break;
        }
        case 'ticketStatus': {
          col['minWidth'] = 60
          col['width'] = 60
          col['cellStyle'] = params => params.data.ticketStatus == "N" ? { 'background-color': 'red' } :
            params.data.ticketStatus == "R" ? { 'background-color': 'orange' } : { 'background-color': 'green' }
          break
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

  redirectToAddInstitute() {
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

  editInstitutes(object) {
    this.context.componentParent.editInstitutes(object)
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
  devices(object) {
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

  async openNotice(object) {
    const modal = await this.modalCtrl.create({
      component: CranixNoticesComponent,
      componentProps: {
        selectedObject: object,
        objectType: this.objectType
      },
      cssClass: 'big-modal'
    })
    modal.present();
  }
}
