import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, ToastController, PopoverController, ModalController } from '@ionic/angular';
// own modules

import { ActionsComponent } from 'src/app/shared/actions/actions.component';
import { ObjectsEditComponent } from 'src/app/shared/objects-edit/objects-edit.component';
import { ServerResponse } from 'src/app/shared/models/server-models';
import { Group, Package, User } from 'src/app/shared/models/data-model';
import { UtilsService } from './utils.service';
import { AuthenticationService } from './auth.service';
import { LanguageService } from './language.service';
import { CrxObjectService } from './crx-object-service';
import { Router } from '@angular/router';
import { objectsTemlate, enumerates, selects, hiddenAttributes, readOnlyAttributes, required, multivalued } from 'src/app/shared/models/constants';
@Injectable({
  providedIn: 'root'
})
export class GenericObjectService {
  //allObjects: {} = {};
  allObjects: Map<string, any[]> = new Map<string, any[]>();
  selectedObject: any = null;
  selectedObjectType: string = null;
  selection: any[] = [];
  selectedIds: number[] = [];
  selectedRoom: any = null;
  selectedGroup: any = null;
  packagesAvailable: Package[] = [];
  objects: string[] = [];
  cephalixDefaults: any = {};
  initialized: number = 0;
  selects = selects;
  required = required;


  constructor(
    public alertCtrl: AlertController,
    public authService: AuthenticationService,
    private http: HttpClient,
    private languageS: LanguageService,
    private utilsS: UtilsService,
    private crxObjectService: CrxObjectService,
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController,
    public toastController: ToastController,
    private router: Router) {
  }

  initialize(force: boolean) {
    this.objects = []
    this.crxObjectService.getSubjects();
    if (this.authService.isAllowed('cephalix.manage')) {
      this.initializeCephalixObjects();
    }
    if (this.authService.isAllowed('customer.manage')) {
      this.objects.push('customer');
    }
    if (this.authService.isAllowed('cephalix.ticket')) {
      this.objects.push('ticket');
    }
    if (this.authService.isAllowed('2fa.manage')) {
      this.objects.push('2fa');
    }
    for (let obj of objectsTemlate) {
      this.objects.push(obj)
    }
    let subs: any = {};
    this.authService.log("initialize all objects")
    for (let key of this.objects) {
      this.getAllObject(key);
    }
    for (let key of enumerates) {
      let url = this.utilsS.hostName() + "/system/enumerates/" + key;
      subs[key] = this.http.get<string[]>(url, { headers: this.authService.headers }).subscribe({
        next: (val) => { selects[key] = val; },
        error: (err) => { },
        complete: () => { subs[key].unsubscribe() }
      });
    }
    if (this.authService.isAllowed('software.download')) {
      this.getSoftwaresToDowload();
    }
    console.log("initialized");
  }


  initializeCephalixObjects() {
    this.objects.push('institute');
    let url = this.utilsS.hostName() + "/institutes/defaults/";
    let sub1 = this.http.get<string[]>(url, { headers: this.authService.headers }).subscribe({
      next: (val) => { this.cephalixDefaults = val; },
      error: (err) => { },
      complete: () => { sub1.unsubscribe() }
    });
    url = this.utilsS.hostName() + "/institutes/ayTemplates/";
    let sub2 = this.http.get<string[]>(url, { headers: this.authService.headers }).subscribe({
      next: (val) => { selects['ayTemplate'] = val; },
      error: (err) => { },
      complete: () => { sub2.unsubscribe() }
    });
    url = this.utilsS.hostName() + "/institutes/objects/";
    let sub3 = this.http.get<string[]>(url, { headers: this.authService.headers }).subscribe({
      next: (val) => { selects['objects'] = val; },
      error: (err) => { },
      complete: () => { sub3.unsubscribe() }
    });
  }
  getSoftwaresToDowload() {
    let url = this.utilsS.hostName() + "/softwares/available";
    let sub = this.http.get<Package[]>(url, { headers: this.authService.headers }).subscribe({
      next: (val) => { this.packagesAvailable = val; },
      error: (err) => {
        console.log('getSoftwaresToDowload');
        console.log(err)
      },
      complete: () => { sub.unsubscribe() }
    });
  }


  getObjects(objectType: string) {
    let url = this.utilsS.hostName() + "/" + objectType + "s/all";
    //We do not read all challenges only the challenges from the selected
    if (objectType == 'challenge' && this.authService.selectedTeachingSubject) {
      url = this.utilsS.hostName() + "/challenges/subjects/" + this.authService.selectedTeachingSubject.id
    }
    console.log("getObjects " + url)
    return fetch(url, {
      method: 'get', headers: new Headers({
        'Content-Type': "application/json",
        'Accept': "application/json",
        'Authorization': "Bearer " + this.authService.session.token
      })
    })
  }
  /**
   * Loads the object of type 'objectType' from the server
   * @param objectType
   */
  async getAllObject(objectType: string) {
    if (this.objects.indexOf(objectType) == -1) {
      console.log("Unknown object type:", objectType)
      return;
    }
    try {
      let respons = await this.getObjects(objectType)
      let val = await respons.json()
      if (objectType == 'ticket') {
        val.sort(this.sortByCreated)
      }
      this.allObjects[objectType] = val;
      selects[objectType + 'Id'] = []
      for (let obj of <any[]>val) {
        selects[objectType + 'Id'].push(obj.id);
      }
      this.authService.log("GenericObjectService: ", objectType + "s were read", this.allObjects[objectType]);
      this.initialized++;
    } catch (error) {
      if (!this.allObjects[objectType]) {
        this.allObjects[objectType] = [];
        selects[objectType + 'Id'] = [];
      }
      console.log('getAllObject', objectType, error);
    }
  }


  getSubscribe(path) {
    let url = this.utilsS.hostName() + path
    return this.http.get<any[]>(url, { headers: this.authService.headers })
  }

  isInitialized() {
    if (this.initialized > 0 && this.initialized >= this.objects.length) {
      return true;
    }
    return false;
  }

  applyAction(object, objectType, action) {
    switch (action) {
      case "add": {
        return this.addObject(object, objectType);
      }
      case "modify": {
        return this.modifyObject(object, objectType);
      }
      case "delete": {
        return this.deleteObject(object, objectType);
      }
    }
  }

  getObjectById(objectType, objectId) {
    if (!objectId) {
      return null;
    }
    if (!objectType) {
      console.log("getObjectById", this);
      return null
    }
    for (let obj of this.allObjects[objectType]) {
      if (obj.id === objectId) {
        return obj;
      }
    }
    return null;
  }

  idToName(objectType, objectId) {
    objectType = this.idToPipe(objectType)
    for (let obj of this.allObjects[objectType]) {
      if (obj.id === objectId) {
        if (obj.name) {
          return obj.name;
        }
        if (obj.uid) {
          return obj.uid + " (" + obj.givenName + " " + obj.surName + ")";
        }
      }
    }
    return objectId;
  }
  idToUid(objectType, objectId) {
    for (let obj of this.allObjects[objectType]) {
      if (obj.id == objectId) {
        return obj.uid;
      }
    }
    return objectId;
  }
  idToFulName(objectId) {
    for (let obj of this.allObjects['user']) {
      if (obj.id == objectId) {
        return obj.surName + ", " + obj.givenName;
      }
    }
    return objectId;
  }
  /**
   * Converts the id name to the object name:
   *  roomId -> room
   *  roomIds -> room
   * @param idName
   */
  idToPipe(idName: string) {
    if (idName == 'creatorId' || idName == 'loggedInId' || idName.startsWith('owner')) {
      return 'user';
    }
    if (idName == 'cephalixCustomerId') {
      return 'customer';
    }
    if (idName == 'cephalixInstituteId') {
      return 'institute';
    }
    if (idName.substring(idName.length - 2) == 'Id') {
      return idName.substring(0, idName.length - 2)
    }
    if (idName.substring(idName.length - 3) == 'Ids') {
      return idName.substring(0, idName.length - 3)
    }
    return idName;
  }

  addObject(object, objectType) {
    const body = object;
    let url = this.utilsS.hostName() + "/" + objectType + "s/add";
    return this.http.post<ServerResponse>(url, body, { headers: this.authService.headers });
  }
  modifyObject(object, objectType) {
    const body = object;
    let url = this.utilsS.hostName() + "/" + objectType + "s/" + object.id;
    return this.http.post<ServerResponse>(url, body, { headers: this.authService.headers })
  }
  deleteObject(object, objectType) {
    let url = this.utilsS.hostName() + "/" + objectType + "s/" + object.id;
    console.log(url)
    return this.http.delete<ServerResponse>(url, { headers: this.authService.headers })
  }

  async deleteObjectDialog(object, objectType, route) {
    let name = "";
    switch (objectType) {
      case 'user': {
        name = object.uid + " ( " + object.givenName + " " + object.surName + " )";
        break;
      }
      case 'ticket': {
        name = object.title;
        break;
      }
      default: {
        name = object.name;
      }
    }
    const alert = await this.alertCtrl.create({
      header: this.languageS.trans('Confirm!'),
      subHeader: this.languageS.trans('Do you realy want to delete?'),
      message: name,
      buttons: [
        {
          text: this.languageS.trans('Cancel'),
          role: 'cancel',
        }, {
          text: 'OK',
          handler: () => {
            this.requestSent();
            var a = this.deleteObject(object, objectType).subscribe({
              next: (val) => {
                this.responseMessage(val);
                if (val.code == "OK") {
                  this.getAllObject(objectType);
                  if (route != '') {
                    this.router.navigate([route]);
                  }
                }
              },
              error: (err) => {
                this.errorMessage(this.languageS.trans("An error was accoured"));
              },
              complete: () => { a.unsubscribe() }
            })
          }
        }
      ]
    });
    await alert.present();
  }

  async modifyObjectDialog(object, objectType) {
    let name = "";
    if (objectType == 'user') {
      name = object.uid + " ( " + object.givenName + " " + object.surName + " )";
    } else {
      name = object.name;
    }
    var a = this.modifyObject(object, objectType).subscribe({
      next: (val) => {
        this.responseMessage(val);
        if (val.code == "OK") {
          this.getAllObject(objectType);
        }
      },
      error: (err) => {
        console.log("ERROR: modifyObjectDialog")
        console.log(object)
        console.log(err);
        this.errorMessage(this.languageS.trans("An error was accoured"));
      },
      complete: () => { a.unsubscribe() }
    });
  }

  async errorMessage(message: string) {
    const toast = await this.toastController.create({
      position: "middle",
      message: message,
      cssClass: "bar-assertive",
      color: "danger",
      duration: this.authService.settings.errorMessageDuration * 1000,
      buttons: [
        {
          text: "",
          role: "cancel",
          icon: "close",
          handler: () => {
            toast.dismiss();
          }
        }
      ]
    });
    (await toast).present();
  }

  async okMessage(message: string) {
    const toast = await this.toastController.create({
      position: "middle",
      message: message,
      cssClass: "bar-assertive",
      color: "success",
      duration: this.authService.settings.okMessageDuration * 1000,
      buttons: [
        {
          text: "",
          role: "cancel",
          icon: "close",
          handler: () => {
            toast.dismiss();
          }
        }
      ]
    });
    (await toast).present();
  }

  async warningMessage(message) {
    const toast = await this.toastController.create({
      position: "middle",
      message: message,
      cssClass: "bar-assertive",
      color: "warning",
      duration: this.authService.settings.warningMessageDuration * 1000,
      buttons: [
        {
          text: "",
          role: "cancel",
          icon: "close",
          handler: () => {
            toast.dismiss();
          }
        }
      ]
    });
    (await toast).present();
  }

  responseMessage(resp: ServerResponse) {
    if (resp.code == 'OK') {
      return this.okMessage(this.languageS.transResponse(resp));
    } else {
      return this.errorMessage(this.languageS.transResponse(resp));
    }
  }

  selectObject() {
    return this.warningMessage(this.languageS.trans('Please select at last one object!'));
  }
  requestSent() {
    return this.warningMessage(this.languageS.trans('Request was sent. Please be patient!'));
  }
  compareFn(a: string, b: string): boolean {
    return a == b;
  }
  compareObjects(o1, o2) {
    return o1.id == o2.id;
  }
  sortByName(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }
  sortByCreatedBack(a, b) {
    if (a.created > b.created) {
      return 1;
    }
    if (a.created < b.created) {
      return -1;
    }
    return 0;
  }
  sortByCreated(a, b) {
    if (a.created < b.created) {
      return 1;
    }
    if (a.created > b.created) {
      return -1;
    }
    return 0;
  }

  isRequired(key: string) {
    key in required
  }

  isReadOnly(key: string) {
    return readOnlyAttributes.indexOf(key) != -1
  }
  /**
   * Helper script fot the template to detect the type of the variables
   * @param val
   */
  typeOf(key: string, object, action: string) {
    let obj = object[key];
    if (key == 'id') {
      return 'numberRO'
    }
    if (key == 'birthDay' || key == 'validity' || key == 'validFrom' || key == 'validUntil') {
      return 'date';
    }
    //if (key == 'reminder' || key == 'created' || key == 'modified') {
    if (key == 'reminder') {
      return 'date-time';
    }
    if (key == 'text' || key == 'domains') {
      return 'text';
    }
    if (typeof obj === 'boolean' && obj) {
      return 'booleanTrue';
    }
    if (typeof obj === 'boolean') {
      return 'booleanFalse';
    }
    if (action == 'modify' && hiddenAttributes.indexOf(key) != -1) {
      return 'hidden';
    }
    if (key == 'name' && object.regCode) {
      return 'string';
    }
    if (key.substring(key.length - 2) == 'Id' && readOnlyAttributes.indexOf(key) != -1) {
      return 'idPipeRO';
    }
    if (typeof obj == 'number' && action == 'modify' && readOnlyAttributes.indexOf(key) != -1) {
      return 'numberRO'
    }
    if (action == 'modify' && readOnlyAttributes.indexOf(key) != -1) {
      return 'stringRO';
    }
    if (key.substring(key.length - 2) == 'Id') {
      return 'idPipe';
    }
    if (key.substring(key.length - 3) == 'Ids') {
      return 'idsPipe';
    }
    if (key.substring(key.length - 4) == 'File') {
      return 'file';
    }
    if (multivalued.indexOf(key) != -1) {
      return 'multivalued';
    }

    if (typeof obj == 'number') {
      return 'number'
    }
    return 'string';
  }

  convertObject(object) {
    //TODO introduce checks
    let output: any = {};
    for (let key in object) {
      if (key == 'birthDay' || key == 'validity' || key == 'created' || key == 'validFrom' || key == 'validUntil' || key == 'modified') {
        console.log(object[key])
        let date = new Date(object[key]);
        output[key] = date.toJSON();
      } else {
        output[key] = object[key];
      }
    }
    return output;
  }

  /*Helper functions for inoic-selectable*/
  formatUsers(users: User[]) {
    return users.map((user) => user.fullName).join(', ');
  }

  formatGroups(groups: Group[]) {
    return groups.map((group) => group.description).join(', ');
  }

  filterObject(objectType: string, filter: string) {
    let rowData = []
    let lowerFilter = filter.toLowerCase();
    for (let o of this.allObjects[objectType]) {
      //TODO split filter also
      for (let field of this.getDefaultSearchFields(objectType)) {
        if (o[field] && o[field].toLowerCase().indexOf(lowerFilter) > -1) {
          rowData.push(o)
          break;
        }
      }
    }
    return rowData
  }

  filterItemsOfObject(objectType: string, filter: string, items: any[]) {
    let rowData = []
    let lowerFilter = filter.toLowerCase();
    for (let o of items) {
      //TODO split filter also
      for (let field of this.getDefaultSearchFields(objectType)) {
        if (o[field] && o[field].toLowerCase().indexOf(lowerFilter) > -1) {
          rowData.push(o)
          break;
        }
      }
    }
    return rowData
  }
  getDefaultSearchFields(objectType: string) {
    switch (objectType) {
      case 'acl': return ['acl']
      case 'announcement': ['issue', 'keywords', 'title']
      case 'category': return ['name', 'description', 'categoryType']
      case 'contact': ['issue', 'name', 'email', 'phone', 'title']
      case 'customer': return ['name', 'name2', 'uuid', 'locality', 'address1', 'address2', 'description', 'contact']
      case 'device': return ['name', 'IP', 'MAC', 'wlanIp', 'wlanMac', 'serial', 'inventary']
      case 'education/group':
      case 'group': return ['name', 'description', 'groupType']
      case 'institute': return ['name', 'uuid', 'instituteType', 'domain', 'locality', 'regCode']
      case 'printer': return ['name', 'model']
      case 'room': return ['name', 'description', 'roomType', 'startIP']
      case 'education/user':
      case 'user': return ['uid', 'givenName', 'surName', 'role']
      case 'ticket': return ['title', 'email', 'firstname', 'lastname']
      default: return ['name', 'description']
    }
  }

  async openActions(objectType: string, object: any, gridApi: any) {
    if (object) {
      this.selectedIds.push(object.id)
      this.selection.push(object)
    } else {
      if (this.selection.length == 0) {
        this.selectObject();
        return;
      }
    }
    const popover = await this.popoverCtrl.create({
      component: ActionsComponent,
      componentProps: {
        objectType: objectType,
        objectIds: this.selectedIds,
        selection: this.selection,
        gridApi: gridApi
      },
      translucent: true,
      animated: true,
      showBackdrop: true
    });
    await popover.present();
  }
}
