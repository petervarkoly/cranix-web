import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgIf } from '@angular/common';
import { Component } from "@angular/core";

import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
    selector: 'institut-status-cell-renderer',
    imports: [ TranslateModule, MatTooltipModule, NgIf ],
    standalone: true,
    template: `
    <ion-button fill="clear" size="small" (click)="details($event)" matTooltip="{{'modify' | translate }}">
        <ion-icon name="build-sharp"></ion-icon>
    </ion-button>
        `
})

export class InstituteStatusRenderer implements ICellRendererAngularComp {
    public params: any;
    agInit(params: any): void {
        this.params = params;
    }

    public details(event) {
        event.stopPropagation();
        this.params.context.componentParent.redirectToEdit(this.params.data);
    }

    refresh(params: any): boolean {
        return true;
    }
}
