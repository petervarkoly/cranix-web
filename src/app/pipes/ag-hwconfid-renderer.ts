import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgIf } from '@angular/common';
import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
    selector: 'hwconfid-cell',
    imports: [ TranslateModule, MatTooltipModule, NgIf ],
    standalone: true,
    template: `{{ params.value | idToName:'hwconf' }}`,
})
export class HwconfIdCellRenderer implements ICellRendererAngularComp {
     params: any;

    constructor(){ }
    agInit(params: any): void {
        this.params = params;
    }
    refresh(params: any): boolean {
        return true;
    }
}
