import { Component, OnInit } from '@angular/core';
import { GridApi, ColumnApi } from 'ag-grid-community';
import { PopoverController } from '@ionic/angular';


import { AuthenticationService } from 'src/app/services/auth.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { Category } from 'src/app/shared/models/data-model';
import { EditBTNRenderer } from 'src/app/pipes/ag-edit-renderer'
import { ActionsComponent } from 'src/app/shared/actions/actions.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  objectKeys: string[] = [];
  displayedColumns: string[] = ['name', 'description', 'categoryType'];
  sortableColumns: string[] = ['name', 'description', 'categoryType'];
  columnDefs = [];
  defaultColDef = {};
  gridApi: GridApi;
  columnApi: ColumnApi;
  context;

  constructor(
    public authService: AuthenticationService,
    public objectService: GenericObjectService,
    public languageS: LanguageService,
    public popoverCtrl: PopoverController,
  ) { 
    this.context = { componentParent: this };
    this.objectKeys = Object.getOwnPropertyNames(new Category());
    this.createColumnDefs();
    this.defaultColDef = {
      resizable: true,
      sortable: true,
      hide: false,
      suppressMenu: true
    }
  }

  ngOnInit() {
  }

  createColumnDefs() {
    this.columnDefs = [];
    let action = {
      headerName: "",
      minWidth: 150,
      suppressSizeToFit: true,
      cellStyle: { 'padding': '2px', 'line-height': '36px' },
      field: 'actions',
      pinned: 'left',
      cellRendererFramework: EditBTNRenderer
    };
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
          col['minWidth'] = 150;
          col['suppressSizeToFit'] = true;
          col['pinned'] = 'left';
          col['flex'] = '1';
          col['colId'] = '1';
          this.columnDefs.push(col);
          this.columnDefs.push(action);
          continue;
        }
        case 'groupType': {
          col['valueGetter'] = function (params) {
            return params.context['componentParent'].languageS.trans(params.data.categoryType);
          }
          break;
        }
      }
      this.columnDefs.push(col);
    }
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

  onQuickFilterChanged(quickFilter) {
    let filter = (<HTMLInputElement>document.getElementById(quickFilter)).value.toLowerCase();
    this.gridApi.setQuickFilter(filter);
    this.gridApi.doLayout();
  }

  public redirectToDelete = (category: Category) => {
    this.objectService.deleteObjectDialog(category, 'group', '')
  }
  /**
  * Open the actions menu with the selected object ids.
  * @param ev
  */
  async openActions(ev: any, object: Category) {
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
        objectType: "category",
        objectIds: this.objectService.selectedIds,
        selection: this.objectService.selection,
        gridApi: this.gridApi
      },
      animated: true,
      showBackdrop: true
    });
    (await popover).present();
  }

}
