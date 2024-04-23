import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';


@Component({
    selector: 'app-device-state',
    template: `
    <ion-button *ngIf="params.context.componentParent.deviceStates[id]['state'] == 0" style="padding-horizontal : 2px" fill="clear"  size="small" (click)="showState()" matTooltip="{{'State of device running' | translate }}">
        <ion-icon color="success" name="power-outline" ></ion-icon>
    </ion-button>
    <ion-button *ngIf="params.context.componentParent.deviceStates[id]['state'] == 1" style="padding-horizontal : 2px" fill="clear"  size="small" (click)="showState()" matTooltip="{{'State of device unknown' | translate }}">
        <ion-icon color="medium" name="power-outline" ></ion-icon>
    </ion-button>
    <ion-button *ngIf="params.context.componentParent.deviceStates[id]['state'] == 2" style="padding-horizontal : 2px" fill="clear"  size="small" (click)="showState()" matTooltip="{{'State of device turned off' | translate }}">
        <ion-icon color="tertiary" name="power-outline" ></ion-icon>
    </ion-button>
    <ion-button *ngIf="params.context.componentParent.deviceStates[id]['state'] == 3" style="padding-horizontal : 2px" fill="clear"  size="small" (click)="showState()" matTooltip="{{'State of device warning' | translate }}">
        <ion-icon color="warning" name="power-outline" ></ion-icon>
        </ion-button>
    <ion-button *ngIf="params.context.componentParent.deviceStates[id]['state'] > 3" style="padding-horizontal : 2px" fill="clear"  size="small" (click)="showState()" matTooltip="{{'State of device error' | translate }}">
        <ion-icon color="danger" name="power-outline" ></ion-icon>
    </ion-button>
    <ion-button style="padding-horizontal : 2px" fill="clear"  size="small" (click)="routeDevice(params.data)" matTooltip="{{'Connect the device in a separate window.' | translate }}">
        <ion-icon name="create-outline" color="secondary"></ion-icon>
    </ion-button>
    `,
  })
  export class DeviceStateComponent implements ICellRendererAngularComp {
    public params;
    public id: number;
    agInit(params: ICellRendererParams): void {
        this.params = params;
        this.id = params.data.id;
        console.log(params.context.componentParent)
    }
    refresh(params: ICellRendererParams) {
      return false;
    }
    showState() {
        let state = "unknown"
        let since = this.params.context.componentParent.deviceStates[this.id]['created']
        switch(this.params.context.componentParent.deviceStates[this.id]['state']){
            case 0: { state = "running since: " + since; break }
            case 1: { state = "unkonwn since: " + since; break }
            case 2: { state = "off since: " + since; break }
            case 3: { state = "warning since: " + since; break }
            default: state = "error code: '" + this.params.context.componentParent.deviceStates[this.id]['state'] + "' since: " + since
        }
        alert(state)
    }
    routeDevice(device){
        alert("TODO")
	    //TODO
    }
  }
