import { Component, Input, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AuthenticationService } from 'src/app/services/auth.service';
import { ChallengesService } from 'src/app/services/challenges.service';
import { CrxObjectService } from 'src/app/services/crx-object-service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { UtilsService } from 'src/app/services/utils.service';
import { GridApi } from 'ag-grid-community';
import type { ColDef, GridOptions } from 'ag-grid-community';
import { UserActionBTNRenderer } from 'src/app/pipes/ag-user-renderer';
import { ActionsComponent } from '../actions/actions.component';
import { PopoverController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'cranix-list',
  templateUrl: './cranix-list.component.html',
  styleUrls: ['./cranix-list.component.scss'],
})
export class CranixListComponent implements OnInit {


  columnDefs: ColDef[] = []
  hiddenColumns: string[] = [
    'childIds',
    'classIds',
    'creatorId',
    'id',
    'mustChange',
    'parentIds',
    'password'
  ];
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
  @Input() objectType: string;
  @Input() context;
  constructor(
    public authService: AuthenticationService,
    private challengeService: ChallengesService,
    public crxObjectService: CrxObjectService,
    public languageService: LanguageService,
    public objectService: GenericObjectService,
    private popoverCtrl: PopoverController,
    private storage: Storage,
    public utilService: UtilsService
  ) {
    this.listContext = { componentParent: this };
    this.authService.log("CranixMdListComponent constructor was called")
    this.utilService.actMdList = this;
    this.useNotice = this.authService.isAllowed('notice.use')
  }

  async ngOnInit() {
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
    for (let key of this.objectKeys) {
      let col = {};
      col['field'] = key;
      col['headerName'] = this.languageService.trans(key);
      col['hide'] = (this.hiddenColumns.indexOf(key) != -1);
      switch (key) {
        case 'uid': {
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
        case 'created':
        case 'modified': {
          col['valueFormatter'] = params => new Date(params.value).toISOString()
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

  redirectToDelete = (object) => {
    this.objectService.deleteObjectDialog(object, this.objectType, '')
  }

  async redirectToGroups(object) {
    this.context.componentParent.redirectToGroups(object);
  }

  async redirectToEdit(object) {
    this.context.componentParent.redirectToEdit(object);
  }

  async openActions(ev: any, object: any) {
    if (object) {
      this.objectService.selectedIds = [ object.id ]
      this.objectService.selection = [ object ]
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
  }
}
