import {Component} from "@angular/core";

import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
    standalone: false,
  selector: 'date-cell',
    template: `{{ params.value | date:'yyyy-MM-dd' }}`,
})
export class DateCellRenderer implements ICellRendererAngularComp {
     params: any;

    constructor(){ }
    agInit(params: any): void {
        this.params = params;
    }
    refresh(params: any): boolean {
        return true;
    }
}
