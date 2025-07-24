import { Component, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';
import { LanguageService } from 'src/app/services/language.service';
import { SecurityService } from 'src/app/services/security-service';
import { AccessInRoom } from 'src/app/shared/models/secutiry-model';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { ModalController } from '@ionic/angular';
import { AddEditRoomAccessComponent } from './add-edit-room-access/add-edit-room-access.component';
import { YesNoBTNRenderer } from 'src/app/pipes/ag-yesno-renderer';
import { SystemService } from 'src/app/services/system.service';

@Component({
  standalone: false,
  selector: 'cranix-room-access',
  templateUrl: './room-access.component.html',
  styleUrls: ['./room-access.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RoomAccessComponent {
  segment = 'list';
  rowData: AccessInRoom[];
  allAccess: AccessInRoom[] = []
  actStatus: AccessInRoom[] = []
  notActive: boolean = false;
  disabled: boolean = false;
  accessOptions = {};

  constructor(
    public authService: AuthenticationService,
    public languageS: LanguageService,
    public modalCtrl: ModalController,
    public objectService: GenericObjectService,
    public systemService: SystemService,
    public securityService: SecurityService
  ) {
    this.getAllAccess();
  }

  getAllAccess() {
    this.securityService.getAllAccess().subscribe(
      (val) => {
        this.allAccess = val
        this.rowData = val
      }
    );
  }
  getActualAccessStatus() {
    this.objectService.okMessage(this.languageS.trans('Loading data ...'));
    this.securityService.getActualAccessStatus().subscribe(
      (val) => {
        let i = 0;
        for (let s of val) {
          s['id'] = i++
        }
        this.actStatus = val
        this.rowData = val
      }
    )
  }
  toggleButton(data, field: string) {
    console.log(data)
    data[field] = !data[field]
    console.log(data)
    this.securityService.setAccessStatusInRoom(data).subscribe(
      (val) => {
        this.objectService.responseMessage(val)
        this.getActualAccessStatus()
      }
    )
  }

  apply(data: AccessInRoom, rowIndex: number) {
    let sent = false
    for (let access of this.rowData) {
      if (access.roomId == data.roomId && access.accessType == "DEF") {
        this.securityService.setAccessStatusInRoom(access)
        sent = true
        break
      }
    }
    if (sent) {
      this.getActualAccessStatus()
    }
  }

  onQuickFilterChanged() {
    let filter = (<HTMLInputElement>document.getElementById('roomsAccessFilter')).value.toLowerCase()
    let tmp = []
    if (this.segment == 'list') {
      for (let o of this.allAccess) {
        if (this.objectService.idToName('room', o.roomId).toLowerCase().indexOf(filter) != -1) {
          tmp.push(o)
        }
      }
    } else {
      for (let o of this.actStatus) {
        if (this.objectService.idToName('room', o.roomId).toLowerCase().indexOf(filter) != -1) {
          tmp.push(o)
        }
      }
    }
    this.rowData = tmp
  }

  segmentChanged(event) {
    this.segment = event.detail.value;
    if (this.segment == "status") {
      this.getActualAccessStatus();
    } else {
      this.getAllAccess()
    }
  }


  async redirectToAddEdit(roomAccess: AccessInRoom) {
    let action = "add";
    if (roomAccess) {
      this.objectService.selectedObject = roomAccess;
      action = "modify";
    } else {
      roomAccess = new AccessInRoom();
    }
    const modal = await this.modalCtrl.create({
      component: AddEditRoomAccessComponent,
      cssClass: 'medium-modal',
      componentProps: {
        objectAction: action,
        roomAccess: roomAccess
      },
      animated: true,
      showBackdrop: true
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data) {
        this.authService.log("Object was created or modified or deleted", dataReturned.data)
      }
      this.getAllAccess();
    });
    (await modal).present();
  }
  restartFirewall() {
    this.systemService.applyServiceState('cranix-firewall', 'activ', 'restart')
  }
  stopFirewall() {
    this.systemService.applyServiceState('cranix-firewall', 'activ', 'false')
  }
}