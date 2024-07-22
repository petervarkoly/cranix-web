import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgIf, DatePipe } from '@angular/common';
import {Component} from "@angular/core";

import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
    selector: 'date-cell',
    imports: [ TranslateModule, MatTooltipModule, NgIf, DatePipe ],
    standalone: true,
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
