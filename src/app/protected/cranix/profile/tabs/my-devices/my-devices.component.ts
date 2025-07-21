import { Component } from '@angular/core';
import { SelfManagementService } from 'src/app/services/selfmanagement.service';
import { takeWhile } from 'rxjs/internal/operators/takeWhile';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { ModalController } from '@ionic/angular';
import { AddDeviceComponent } from 'src/app/protected/cranix/devices/add-device/add-device.component';
import { Device } from 'src/app/shared/models/data-model';

@Component({
  standalone: false,
  selector: 'cranix-my-devices',
  templateUrl: './my-devices.component.html',
  styleUrls: ['./my-devices.component.scss'],
})
export class MyDevicesComponent {

  alive: boolean = true;

  myDevs: Device[] = [];
  constructor(private selfS: SelfManagementService,
    public modalCtrl: ModalController,
    public objectService: GenericObjectService) {
    this.readDevice()
  }

  readDevice(){
    this.selfS.getMyDevices().subscribe((val) => { this.myDevs = val })
  }
  
  deleteDev(dev: number) {
    this.selfS.removeDevice(dev).subscribe(
      (val) => {
        this.readDevice()
      }
    )
  }

  async addDevice(ev: Event) {
    const modal = await this.modalCtrl.create({
      component: AddDeviceComponent,
      cssClass: 'small-modal',
      componentProps: {
        adHocRoom: true
      },
      animated: true,
      backdropDismiss: false
    });
    modal.onDidDismiss().then((data) => {
      this.readDevice()
    });
    return await modal.present();
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
