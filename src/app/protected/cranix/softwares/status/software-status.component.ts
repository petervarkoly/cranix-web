import { Component, OnInit } from '@angular/core';
//Own stuff
import { AuthenticationService } from 'src/app/services/auth.service';
import { SoftwareService } from 'src/app/services/softwares.service'
import { SoftwareStatus } from 'src/app/shared/models/data-model';

@Component({
  standalone: false,
    selector: 'cranix-software-status',
  templateUrl: './software-status.component.html',
  styleUrls: ['./software-status.component.scss'],
})
export class SoftwareStatusComponent {
  context;
  softwareData: SoftwareStatus[] = [];
  softwareDataBack: SoftwareStatus[] = [];
  selectedRooms = [];
  selectedSoftwares = [];
  selectedStati: string[] = [];
  rooms = [];
  softwares = [];
  stati: string[] = [];
  constructor(
    public authService: AuthenticationService,
    public softwareService: SoftwareService
  ) {
    this.context = { componentParent: this };
    this.readSoftwareData();
  }

  readSoftwareData() {
    let subM = this.softwareService.getSoftwareStatus().subscribe(
      (val) => {
        this.softwareData = val;
        this.authService.log(val);
        let temp1 = [];
        let temp2 = [];
        for (let obj of this.softwareData) {
          if (temp1.indexOf(obj.softwareName) == -1) {
            temp1.push(obj.softwareName)
            this.softwares.push(
              { key: obj.softwareName, value: obj.softwareName }
            )
          }
          if (temp2.indexOf(obj.roomName) == -1) {
            temp2.push(obj.roomName)
            this.rooms.push(
              { key: obj.roomName, value: obj.roomName }
            )
          }
          if (this.stati.indexOf(obj.status) == -1) {
            this.stati.push(obj.status)
          }
        }
        this.stati.sort()
        this.softwares.sort()
        this.rooms.sort()
      })
  }

  readFilteredSoftwareData() {
    if (this.softwareDataBack.length == 0) {
      this.softwareDataBack = this.softwareData;
    }
    this.softwareData = [];
    let sRooms:    string[] = [];
    let sSoftware: string[] = [];
    for( let m of this.selectedRooms ) {
      sRooms.push(m.value)
    }
    for( let m of this.selectedSoftwares ) {
      sSoftware.push(m.value)
    }
    for (let obj of this.softwareDataBack) {
      if (sRooms.length == 0 || sRooms.indexOf(obj.roomName) != -1) {
        if (sSoftware.length == 0 || sSoftware.indexOf(obj.softwareName) != -1) {
          if (this.selectedStati.length == 0 || this.selectedStati.indexOf(obj.status) != -1) {
            this.softwareData.push(obj)
          }
        }
      }
    }
  }
}
