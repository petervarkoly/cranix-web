import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
    standalone: false,
  selector: 'deviceid-cell',
    template: `{{ params.value | idToName:'device' }}`,
})
export class DeviceIdCellRenderer implements ICellRendererAngularComp {
     params: any;

    constructor(){ }
    agInit(params: any): void {
        this.params = params;
    }
    refresh(params: any): boolean {
        return true;
    }
}
