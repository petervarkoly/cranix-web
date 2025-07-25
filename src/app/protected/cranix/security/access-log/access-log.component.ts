import { Component } from '@angular/core';
import { SystemService } from 'src/app/services/system.service';

@Component({
  standalone: false,
    selector: 'cranix-access-log',
  templateUrl: './access-log.component.html',
  styleUrls: ['./access-log.component.scss'],
})
export class AccessLogComponent {
  rowData;
  context
  constructor(
    private systemService: SystemService

  ) {
    this.context = { componentParent: this };
    this.systemService.getFile("/var/log/cranix-internet-access.log").subscribe(
      (val) => {
        let tmp= []
        for ( let line of val.split("\n")) {
          let lline = line.split(";")
          tmp.push(
            {
              time: lline[0].substring(0,19),
              user: lline[1],
              sourceIp: lline[2],
              destinationIp: lline[3],
              protocol: lline[4],
              port: lline[5]
            }
          )
        }
        this.rowData = tmp
      }
    )
  }
}
