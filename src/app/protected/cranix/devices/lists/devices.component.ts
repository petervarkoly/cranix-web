import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

//own modules
import { ObjectsEditComponent } from 'src/app/shared/objects-edit/objects-edit.component';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { Device } from 'src/app/shared/models/data-model'
import { AuthenticationService } from 'src/app/services/auth.service';
import { DevicePrintersComponent } from './../details/printers/device-printers.component';
import { AddDeviceComponent } from './../add-device/add-device.component';
import { ManageDhcpComponent } from 'src/app/shared/actions/manage-dhcp/manage-dhcp.component';

@Component({
  standalone: false,
    selector: 'cranix-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent implements OnInit {
  selectedRoom;
  objectKeys: string[] = [
    "roomId",
    "name",
    "ip",
    "mac",
    "wlanIp",
    "wlanMac",
    "hwconfId",
    "place",
    "row",
    "serial",
    "inventary",
    "locality",
    "created",
    "modified"
  ]
  displayedColumns: string[] = ['name', 'mac', 'ip', 'hwconfId', 'roomId'];
  sortableColumns: string[] = ['name', 'mac', 'ip', 'hwconfId', 'roomId'];
  context;
  title = 'app';
  rowData = [];
  selection: Device[] = [];
  selectedIds: number[] = [];

  constructor(
    public authService: AuthenticationService,
    public alertController: AlertController,
    public languageS: LanguageService,
    public modalCtrl: ModalController,
    public objectService: GenericObjectService,
    public popoverCtrl: PopoverController,
    public route: Router
  ) {
    this.context = { componentParent: this };
  }
  ngOnInit() {
    if (this.objectService.selectedRoom) {
      this.selectedRoom = this.objectService.selectedRoom;
      this.rowData = [];
      for (let dev of this.objectService.allObjects['device']) {
        if (dev.roomId == this.selectedRoom.id && dev.hwconfId != 2) {
          this.rowData.push(dev);
        }
      }
    } else {
      this.rowData = this.objectService.allObjects['device'].filter(obj => obj.hwconfId != 2);
      delete this.selectedRoom;
    }
    delete this.objectService.selectedObject;
  }

  ngOnDestroy() {
    console.log("ngOnDestroy")
    delete this.objectService.selectedRoom;
    delete this.objectService.selectedObject;
  }
  
  async redirectToEdit(device: Device) {
    let action = "modify";
    if (!device) {
      return this.addDevice(null);
    }
    const modal = await this.modalCtrl.create({
      component: ObjectsEditComponent,
      cssClass: "medium-modal",
      componentProps: {
        objectType: "device",
        objectAction: action,
        objectKeys: this.objectKeys,
        object: device
      },
      animated: true,
      showBackdrop: true
    });
    (await modal).present();
  }

  async setDhcp(device: Device) {
    const modal = await this.modalCtrl.create({
      component: ManageDhcpComponent,
      componentProps: {
        objectType: "device",
        object: device
      },
      animated: true,
      backdropDismiss: false
    });
    (await modal).present();
  }

  async setPrinters(device: Device) {
    this.objectService.selectedObject = device;
    const modal = await this.modalCtrl.create({
      component: DevicePrintersComponent,
      cssClass: "small-modal",
      animated: true,
      backdropDismiss: false
    });
    (await modal).present()
  }
  async addDevice(ev: Event) {
    const modal = await this.modalCtrl.create({
      component: AddDeviceComponent,
      cssClass: 'medium-modal',
      componentProps: {
        adHocRoom: false
      },
      animated: true,
      backdropDismiss: false
    });
    (await modal).present()
  }
}
