import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { TranslateService } from '@ngx-translate/core';


import {CephalixService} from 'src/app/services/cephalix.service';
import { Institute } from 'src/app/shared/models/cephalix-data-model';

@Component({
  selector: 'cranix-institutes',
  templateUrl: './institutes.page.html',
  styleUrls: ['./institutes.page.scss'],
})
export class InstitutesPage implements OnInit {

  displayedColumns: string[] = ['select', 'uuid', 'name', 'locality','ipVPN', 'regCode','actions'];
  dataSource:  MatTableDataSource<Institute> ;
  selection = new SelectionModel<Institute>(true, []);
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    cephalixS: CephalixService,
    public translateService: TranslateService
  ) {
   // this.translateService.setDefaultLang('de');
   console.log('Trans in institutes', this.translateService.translations);
    cephalixS.getAllInstitutes().subscribe(
      (res) => {
      this.dataSource = new MatTableDataSource<Institute>(res)
    },
    (err) => { },
      () => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  ngOnInit() {
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  public redirectToEdit = (institute: Institute) => {
    console.log("edit:" + institute.name)
  }
 
  public redirectToDelete = (institute: Institute)  => {
    console.log("Delete:" + institute.uuid)
  }
}
