import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

//Own stuff
import { AdHocRoom } from 'src/app/shared/models/data-model'
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { AuthenticationService } from 'src/app/services/auth.service';
import { LanguageService } from 'src/app/services/language.service';
import { ObjectsEditComponent } from 'src/app/shared/objects-edit/objects-edit.component';
@Component({
  standalone: false,
    selector: 'cranix-adhoc',
  templateUrl: './adhoc.component.html',
  styleUrls: ['./adhoc.component.scss'],
})
export class AdhocComponent {

  objectKeys: string[] =Object.getOwnPropertyNames(new AdHocRoom());
  displayedColumns: string[] = ['name', 'description','devCount', 'devicesProUser','roomControl', 'groupIds', 'userIds', 'studentsOnly'];
  sortableColumns:    string[] = ['name', 'description', 'devCount','devicesProUser', 'roomControl','groupIds', 'userIds',];
  columnDefs = [];
  defaultColDef = {};
  gridApi;
  columnApi;
  context;

  constructor(
    public authService: AuthenticationService,
    public languageS: LanguageService,
    public objectService: GenericObjectService,
    public modalCtrl: ModalController
  ) {
    this.context = { componentParent: this };
  }

  async redirectToEdit(adhocroom: AdHocRoom) {
    let action = "";
    if (adhocroom) {
      action = 'modify';
      delete adhocroom.hwconfId;
      delete adhocroom.network;
      this.objectService.selectedObject = adhocroom;
    } else {
      action = "add";
      adhocroom = new AdHocRoom;
      adhocroom.network = this.objectService.selects['network'][0];
      adhocroom.hwconfId = 3;
      adhocroom.devCount = 512;
      adhocroom.roomControl = 'allTeachers'
    }
    delete adhocroom.accessInRooms;
    delete adhocroom.groups;
    delete adhocroom.netMask;
    delete adhocroom.roomType;
    delete adhocroom.places;
    delete adhocroom.rows;
    delete adhocroom.startIP;
    delete adhocroom.users;
    delete adhocroom.userIds;
    const modal = await this.modalCtrl.create({
      component: ObjectsEditComponent,
      cssClass: 'medium-modal',
      componentProps: {
        objectType: "adhocroom",
        objectAction: action,
        object: adhocroom
      },
      animated: true,
      showBackdrop: true
    });
    (await modal).present();
  }
}
