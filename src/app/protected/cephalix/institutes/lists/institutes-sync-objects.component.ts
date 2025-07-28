import { Component } from '@angular/core';

//Own stuff
import { AuthenticationService } from 'src/app/services/auth.service';
import { CephalixService } from 'src/app/services/cephalix.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';

@Component({
  standalone: false,
  selector: 'cranix-institutes-sync-objects',
  templateUrl: './institutes-sync-objects.component.html'
})
export class InstitutesSyncObjectsComponent {

  context;
  segment = "user";
  memberData = {};
  objectsToSync: string[] = [];
  selectedObjects: any[] = []
  items: any[]
  institute;
  constructor(
    public authService: AuthenticationService,
    public cephalixService: CephalixService,
    public objectService: GenericObjectService
  ) {
    this.context = { componentParent: this };
    this.readMembers();
  }

  segmentChanged(event) {
    this.items = null
    this.segment = event.detail.value;
    this.items = this.memberData[this.segment]
  }
  readMembers() {
    let subM = this.cephalixService.getObjectsToSynchronize().subscribe(
      (val) => {
        var i = 0
        let tmp = {}
        for (let obj of val) {
          let objectType = obj.objectType.toLowerCase()
          if (this.objectsToSync.indexOf(objectType) == -1) {
            this.objectsToSync.push(objectType)
          }
          if (!tmp[objectType]) {
            tmp[objectType] = []
          }
          obj['id'] = i++;
          tmp[objectType].push(obj)
        }
        console.log(tmp)
        this.memberData = tmp;
      },
      (err) => { this.authService.log(err) },
      () => { subM.unsubscribe() });
  }
  startSync(en: Event) {
    this.objectService.requestSent();
    for (let institute of this.objectService.selectedObjects) {
      for (let sel of this.selectedObjects) {
        this.cephalixService.putObjectToInstitute(institute.id, sel.objectType, sel.cephalixId)
          .subscribe(
            (val) => { this.objectService.responseMessage(val) })
      }
    }
  }
  stopSync(en: Event) {
    this.objectService.requestSent();
    for (let institute of this.objectService.selectedObjects) {
      for (let sel of this.selectedObjects) {
        this.cephalixService.deleteObjectFromInstitute(institute.id, sel.objectType, sel.cephalixId)
          .subscribe(
            (val) => { this.objectService.responseMessage(val) })
      }
    }
  }
}
