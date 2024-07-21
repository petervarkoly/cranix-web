import { addIcons } from 'ionicons';
import { close, addCircle, ellipsisVerticalSharp, arrowBack, arrowForward, arrowForwardCircle, printOutline, stopCircleOutline, chevronForwardCircleOutline, archive, trash, createOutline, server, print, desktop, people, peopleCircle, trashOutline } from 'ionicons/icons';
import { IonToolbar, IonItem, IonInput, IonLabel, IonIcon, IonButtons, IonButton, IonSearchbar, IonFab, IonFabButton, IonFabList, IonItemSliding, IonNote, IonCheckbox, IonItemOptions, IonItemOption } from '@ionic/angular/standalone';
import { Component, Input, OnInit, inject } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';
import { ChallengesService } from 'src/app/services/challenges.service';
import { CrxObjectService } from 'src/app/services/crx-object-service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'cranix-md-list',
  imports: [ IonToolbar, IonItem, IonInput, IonLabel, IonIcon, IonButtons, IonButton, IonSearchbar, IonFab, IonFabButton, IonFabList, IonItemSliding, IonNote, IonCheckbox, IonItemOptions, IonItemOption ],
  templateUrl: './cranix-md-list.component.html',
  styleUrls: ['./cranix-md-list.component.scss'],
})
export class CranixMdListComponent implements OnInit {
  public authService = inject(AuthenticationService)
  private challengeService = inject(ChallengesService)
  public crxObjectService = inject(CrxObjectService)
  public languageService = inject(LanguageService)
  public objectService = inject(GenericObjectService)
  public utilService = inject(UtilsService

  min: number;
  step: number;
  max: number;
  rowData = [];
  left1: string;
  left2: string;
  left3: string;
  @Input() objectType: string;
  @Input() context;
  constructor(
  ) {
    addIcons ({ close, addCircle, ellipsisVerticalSharp, arrowBack, arrowForward, arrowForwardCircle, printOutline, stopCircleOutline, chevronForwardCircleOutline, archive, trash, createOutline, server, print, desktop, people, peopleCircle, trashOutline });
    this.authService.log("CranixMdListComponent constructor was called")
    this.utilService.actMdList = this;
  }

  ngAfterContentInit() {
    this.subjectChanged(null)
    console.log("CranixMdListComponent ngAfterContentInit")
  }

  async ngOnInit() {
    this.objectService.selection = []
    this.objectService.selectedIds = []
    this.initSteps()
    if (!this.min) {
      this.min = -1;
    }
    if (!this.step || this.step < 3) {
      this.step = 3;
    }
    this.left1 = 'name'
    this.left2 = 'description'
    this.left3 = ''
    switch (this.objectType) {
      case "education/user":
      case "user": {
        this.left1 = "uid"
        this.left2 = "surName"
        this.left3 = "givenName"
        break
      }
      case 'device': {
        this.left2 = 'ip'
        break
      }
      case 'institute': {
        this.left2 = "regCode"
        break
      }
      case 'customer': {
        this.left2 = "locality"
        break
      }
    }
    while (!this.objectService.allObjects[this.objectType]) {
      await new Promise(f => setTimeout(f, 1000));
    }
    if (this.objectType == 'device') {
      for (let dev of this.objectService.allObjects[this.objectType]) {
        if (dev.hwconfId == 2) {
          continue
        }
        if (this.objectService.selectedRoom && dev.roomId != this.objectService.selectedRoom) {

        }
        this.rowData.push(dev);
      }
    } else {
      this.rowData = this.objectService.allObjects[this.objectType]
    }
    if (this.max > (this.rowData.length)) {
      this.max = this.rowData.length
    }
    this.authService.log("CranixMdListComponent ngOnInit", this.rowData)
  }

  initSteps() {
    this.step = Number(this.authService.settings.lineProPageMD);
    this.min = -1;
    if (!this.step || this.step < 3) {
      this.step = 3;
    }
    this.max = this.min + this.step + 1;
    this.authService.log("CranixMdListComponent Min Max Step", this.min, this.max, this.step)
  }

  back() {
    this.min -= this.step;
    if (this.min < -1) {
      this.min = -1
    }
    this.max = this.min + this.step + 1;
    if (this.max > (this.rowData.length)) {
      this.max = this.rowData.length
    }
  }

  forward() {
    this.max += this.step;
    if (this.max < (this.step)) {
      this.max = this.step
    }
    this.min = this.max - this.step - 1;
    if (this.max > (this.rowData.length)) {
      this.max = this.rowData.length
    }
  }

  checkChange(ev, dev) {
    if (ev.detail.checked) {
      this.objectService.selectedIds.push(dev.id)
      this.objectService.selection.push(dev)
    } else {
      this.objectService.selectedIds = this.objectService.selectedIds.filter(id => id != dev.id)
      this.objectService.selection = this.objectService.selection.filter(obj => obj.id != dev.id)
    }
  }

  onQuickFilterChanged() {
    let filter = (<HTMLInputElement>document.getElementById('filterMD')).value.toLowerCase();
    this.min = -1;
    this.max = this.step;
    this.rowData = [];
    switch (this.objectType) {
      case "adhocroom": {
        for (let obj of this.objectService.allObjects[this.objectType]) {
          if (
            obj.name.toLowerCase().indexOf(filter) != -1 ||
            obj.description.toLowerCase().indexOf(filter) != -1
          ) {
            this.rowData.push(obj)
          }
        }
        break
      }
      case "device": {
        for (let dev of this.objectService.allObjects[this.objectType]) {
          if (this.objectService.selectedRoom && dev.roomId != this.objectService.selectedRoom) {
            continue
          }
          if (
            dev.name.toLowerCase().indexOf(filter) != -1 ||
            dev.ip.indexOf(filter) != -1 ||
            dev.mac.toLowerCase().indexOf(filter) != -1
          ) {
            this.rowData.push(dev)
          }
        }
        break
      }
      case "education/user":
        {
          for (let obj of this.objectService.allObjects[this.objectType]) {
            if (
              obj.uid.toLowerCase().indexOf(filter) != -1 ||
              obj.givenName.toLowerCase().indexOf(filter) != -1 ||
              obj.surName.toLowerCase().indexOf(filter) != -1
            ) {
              this.rowData.push(obj)
            }
          }
          break
        }
      case "education/group":
      case "group": {
        for (let obj of this.objectService.allObjects[this.objectType]) {
          if (
            obj.name.toLowerCase().indexOf(filter) != -1 ||
            obj.description.toLowerCase().indexOf(filter) != -1 ||
            this.languageService.trans(obj.groupType).toLowerCase().indexOf(filter) != -1
          ) {
            this.rowData.push(obj)
          }
        }
        break
      }
      case "institute": {
        for (let obj of this.objectService.allObjects[this.objectType]) {
          if (
            obj.name.toLowerCase().indexOf(filter) != -1 ||
            (obj.regCode && obj.regCode.toLowerCase().indexOf(filter) != -1) ||
            (obj.locality && obj.locality.toLowerCase().indexOf(filter) != -1)
          ) {
            this.rowData.push(obj)
          }
        }
        break
      }
      case "printer": {
        for (let dev of this.objectService.allObjects[this.objectType]) {
          if (
            dev.name.toLowerCase().indexOf(filter) != -1 ||
            dev.model.indexOf(filter) != -1
          ) {
            this.rowData.push(dev)
          }
        }
        break
      }
      case "room": {
        for (let obj of this.objectService.allObjects[this.objectType]) {
          if (
            obj.name.toLowerCase().indexOf(filter) != -1 ||
            obj.description.toLowerCase().indexOf(filter) != -1 ||
            this.languageService.trans(obj.roomType).toLowerCase().indexOf(filter) != -1 ||
            this.languageService.trans(obj.roomControl).toLowerCase().indexOf(filter) != -1
          ) {
            this.rowData.push(obj)
          }
        }
        break
      }
      case "user": {
        for (let obj of this.objectService.allObjects[this.objectType]) {
          if (
            obj.uid.toLowerCase().indexOf(filter) != -1 ||
            obj.givenName.toLowerCase().indexOf(filter) != -1 ||
            obj.surName.toLowerCase().indexOf(filter) != -1 ||
            this.languageService.trans(obj.role).toLowerCase().indexOf(filter) != -1
          ) {
            this.rowData.push(obj)
          }
        }
        break
      }
      case "challenge":
      case "challenges/todo": {
        for (let obj of this.objectService.allObjects[this.objectType]) {
          if (
            obj.description.toLowerCase().indexOf(filter) != -1
          ) {
            this.rowData.push(obj)
          }
        }
        break
      }
    }
    if (this.rowData.length < this.step) {
      this.min = -1
      this.max = this.rowData.length
    }
  }

  subjectChanged(event) {
    console.log(event)
    let path = "/" + this.objectType + "s/all";
    //We do not read all challenges only the challenges from the selected
    if (this.objectType == 'challenge' && this.authService.selectedTeachingSubject) {
      path = "/challenges/subjects/" + this.authService.selectedTeachingSubject.id
    }
    this.authService.saveSelectedSubject()
    this.objectService.allObjects[this.objectType] = null
    this.objectService.getSubscribe(path).subscribe(
      (val) => {
        this.rowData = val
        this.objectService.allObjects[this.objectType] = val
        this.objectService.selection = []
        this.objectService.selectedIds = [];
        this.initSteps()
      }
    )
    if (this.context.componentParent.subjectChanged && this.authService.selectedTeachingSubject) {
      this.context.componentParent.subjectChanged(this.authService.selectedTeachingSubject.id)
    }
  }

  getCephalixChallenges() {
    if(!this.authService.selectedTeachingSubject){
      this.objectService.warningMessage(this.languageService.trans("Select one teaching subject"))
      return
    }

    this.objectService.warningMessage(
      this.languageService.trans("Check all questions and answers for accuracy! We do not guarantee that the solutions are correct.")
    )
    this.challengeService.getChallengesFromCephalix(this.authService.selectedTeachingSubject).subscribe({
      next: (val) => {
        this.rowData = val
        console.log(this.rowData)
      },
      error: (error) => { this.objectService.errorMessage(error)}
    })
  }
}
