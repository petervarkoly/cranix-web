import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgIf } from '@angular/common';
import { Component } from "@angular/core";

import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
    selector: 'yesno-cell-text',
    imports: [ TranslateModule, MatTooltipModule, NgIf ],
    standalone: true,
    template: `
    <ion-checkbox  *ngIf="params.data"
    class="ion-align-self-center"
    [checked]="params.context.componentParent.rowData[index][field]"
    color="success" (ionChange)="toggle($event)"></ion-checkbox>
        `
})

export class CheckBoxBTNRenderer implements ICellRendererAngularComp {
    public params: any;
    public field;
    public index;

    agInit(params: any ): void {
        this.params = params;
        this.field = this.params.colDef.field;
        this.index = this.params.rowIndex;
    }

    public toggle(event) {
       event.stopPropagation();
       let field = this.params.colDef.field;
       let index = this.params.rowIndex;
       this.params.context.componentParent.rowData[index][field] = event.detail.checked;
       if( this.params.context.componentParent.setChanged ) {
        this.params.context.componentParent.setChanged(true);
       }
    }
    refresh(params: any): boolean {
        return true;
    }
}
