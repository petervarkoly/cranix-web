import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgIf } from '@angular/common';
import { Component } from "@angular/core";

import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
    selector: 'apply-cell',
    imports: [ TranslateModule, MatTooltipModule, NgIf ],
    standalone: true,
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
