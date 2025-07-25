import { Component } from "@angular/core";

import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
    standalone: false,
    selector: 'apply-cell',
    template: `
        <ion-button *ngIf="params.data" style="padding-horizontal : 2px" fill="clear" size="small" (click)="apply($event)" matTooltip="{{'apply' | translate }}">
            <ion-icon name="checkmark-circle" color="tertiary"></ion-icon>
        </ion-button>
        `
})

export class ApplyBTNRenderer implements ICellRendererAngularComp {
    public params: any;
    public active: boolean = false;

    agInit(params: any): void {
        this.params = params;
        if (this.params.context.componentParent.apply) {
            this.active = true;
        }
    }

    public apply(event) {
        event.stopPropagation();
        if (this.active) {
            this.params.context.componentParent.apply(
                this.params.data,
                this.params.rowIndex);
        }
    }
    refresh(params: any): boolean {
        return true;
    }
}
