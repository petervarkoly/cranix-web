import { Component } from "@angular/core";

import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
    standalone: false,
    selector: 'user-action-cell-renderer',
    template: `
        <ion-button style="padding-horizontal : 2px" fill="clear" size="small" (click)="details($event)" matTooltip="{{'edit' | translate }}">
             <ion-icon name="build-sharp"></ion-icon>
        </ion-button>
        @if(useNotice){
        <ion-button  style="padding-horizontal : 2px" fill="clear" size="small" (click)="openNotice($event)" matTooltip="{{'notice' | translate }}">
            <ion-icon slot="icon-only" name="clipboard" color="tertiary"></ion-icon>
        </ion-button>
        }
        <ion-button style="padding-horizontal : 2px" fill="clear" size="small" (click)="groups($event)" matTooltip="{{'groups' | translate }}">
             <ion-icon name="people"></ion-icon>
        </ion-button>
        <ion-button fill="clear" size="small" (click)="openAction($event)" matTooltip="{{'Apply actions on the selected objects' | translate }}">
            <ion-icon  name="ellipsis-vertical-sharp"></ion-icon> 
        </ion-button>
        <ion-button style="padding-horizontal : 2px" fill="clear"  size="small" (click)="delete($event)" matTooltip="{{'delete' | translate }}">
            <ion-icon color="danger" name="trash-outline" ></ion-icon>
        </ion-button>
        `
})

export class UserActionBTNRenderer implements ICellRendererAngularComp {
    private params: any;
    public useNotice: boolean = false;

    agInit(params: any): void {
        this.params = params;
        this.useNotice = this.params.context.componentParent.useNotice;
    }

    public details(event) {
        event.stopPropagation();
        this.params.context.componentParent.redirectToEdit(this.params.data);
    }
    public groups(event) {
        event.stopPropagation();
        this.params.context.componentParent.redirectToGroups(this.params.data);
    }
    public openAction(event) {
        event.stopPropagation();
        this.params.context.componentParent.openActions(event, this.params.data)
    }
    public delete(event) {
        event.stopPropagation();
        this.params.context.componentParent.redirectToDelete(this.params.data);
    }
    public openNotice(event) {
        event.stopPropagation();
        this.params.context.componentParent.openNotice(this.params.data);
    }
    refresh(params: any): boolean {
        return true;
    }

}
