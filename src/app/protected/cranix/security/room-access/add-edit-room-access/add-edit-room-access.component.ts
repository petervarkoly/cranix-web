import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
//own
import { GenericObjectService } from 'cranix-common/dist/services/generic-object.service';
import { LanguageService } from 'cranix-common/dist/services/language.service';
import { RoomsService } from 'cranix-common/dist/services/rooms.service';
import { SecurityService } from 'cranix-common/dist/services/security-service';
import { Room } from 'cranix-common/dist/models/data-model';
import { AccessInRoom } from 'cranix-common/dist/models/security-model';
@Component({
  selector: 'cranix-add-edit-room-access',
  templateUrl: './add-edit-room-access.component.html',
})
export class AddEditRoomAccessComponent implements OnInit {
  result: any = {};
  objectKeys: string[] = [];
  objectActionTitle: string = "";
  roomsToSelect: Room[];

  @Input() roomAccess: AccessInRoom;
  @Input() objectAction: string;
  constructor(
    public objectService: GenericObjectService,
    public languageS: LanguageService,
    private modalController: ModalController,
    public securityService: SecurityService,
    public translateService: TranslateService,
    public roomService: RoomsService
  ) {
  }
  ngOnInit() {
    if (this.objectAction == 'add') {
      this.objectActionTitle = "Add room access rule.";
    } else {
      this.objectActionTitle = "Edit room access rule.";
    }
    this.roomService.getControllableRooms().subscribe(
      (val) => {
        this.roomsToSelect = val;
      }
    )
    this.objectKeys = Object.getOwnPropertyNames(this.roomAccess);
  }
  roomChanged(room: Room) {
    this.roomAccess.roomId = room.id;
  }

  closeWindow() {
    this.modalController.dismiss();
  }
  onSubmit() {
    console.log("onSubmit", this.roomAccess);
    this.securityService.addAccessInRoom(this.roomAccess);
    this.modalController.dismiss(this.roomAccess);
  }

  deleteObject() {
    this.securityService.deleteAccessInRoom(this.roomAccess.id);
    this.modalController.dismiss(this.roomAccess);
  }
}


