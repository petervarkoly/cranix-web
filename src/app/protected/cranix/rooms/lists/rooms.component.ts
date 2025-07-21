import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

//own modules
import { ObjectsEditComponent } from 'src/app/shared/objects-edit/objects-edit.component';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { Room } from 'src/app/shared/models/data-model';
import { AuthenticationService } from 'src/app/services/auth.service';
import { RoomPrintersPage } from '../details/printers/room-printers.page';
import { ManageDhcpComponent } from 'src/app/shared/actions/manage-dhcp/manage-dhcp.component';

@Component({
  standalone: false,
    selector: 'cranix-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent {
  objectKeys: string[] = [ 'id', 'name', 'ignoreNetbios', 'description', 'roomControl', 'hwconfId', 'startIP', 'devCount', 'roomType', 'network', 'places', 'rows' ]
  displayedColumns: string[] = ['name', 'description', 'roomType', 'roomControl', 'hwconfId', 'actions'];
  sortableColumns: string[] = ['name', 'description', 'roomType', 'roomControl', 'hwconfId'];
  context;

  constructor(
    public authService: AuthenticationService,
    public objectService: GenericObjectService,
    public modalCtrl: ModalController,
    public route: Router
  ) {
    this.context = { componentParent: this };
  }

  async redirectToEdit(room: Room) {
    let action = "";
    if (room) {
      delete room.accessInRooms;
      this.objectService.selectedObject = room;
      action = 'modify';
    } else {
      action = "add";
      room = new Room;
      room.network = this.objectService.selects['network'][0];
      delete room.accessInRooms;
      delete room.netMask;
      delete room.startIP;
      room.devCount = 32;
      //TODO set defaults configurable
      room.roomControl = 'allTeachers'
      room.roomType = 'ComputerRoom'
      room.hwconfId = 4
    }
    const modal = await this.modalCtrl.create({
      component: ObjectsEditComponent,
      cssClass: 'medium-modal',
      componentProps: {
        objectType: "room",
        objectAction: action,
        object: room,
        objectKeys: this.objectKeys
      },
      animated: true,
      showBackdrop: true
    });
    (await modal).present();
  }

  async setDhcp(room: Room) {
    this.objectService.selectedObject = room;
    const modal = await this.modalCtrl.create({
      component: ManageDhcpComponent,
      componentProps: {
        objectType: "room",
        object: room
      },
      animated: true,
      backdropDismiss: false
    });
    (await modal).present();
  }

  async setPrinters(room: Room) {
    this.objectService.selectedObject = room;
    const modal = await this.modalCtrl.create({
      component: RoomPrintersPage,
      cssClass: "small-modal",
      animated: true,
      backdropDismiss: false
    });
    (await modal).present()
  }

  public devices(room: Room) {
    this.objectService.selectedRoom = room;
    this.route.navigate(['/pages/cranix/devices']);
  }
}
