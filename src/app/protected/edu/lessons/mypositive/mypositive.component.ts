import { Component } from '@angular/core';

//Our Stuff
import { ObjectsEditComponent } from 'src/app/shared/objects-edit/objects-edit.component';
import { PositivList } from 'src/app/shared/models/data-model'
import { AuthenticationService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language.service';
import { EductaionService } from 'src/app/services/education.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';

@Component({
  standalone: false,
  selector: 'cranix-mypositive',
  templateUrl: './mypositive.component.html',
  styleUrls: ['./mypositive.component.scss'],
})
export class MypositiveComponent {

  rowData: any[];
  selectedIds: number[] = []
  context;

  constructor(
    public authService: AuthenticationService,
    public educationService: EductaionService,
    public languageS: LanguageService,
    public modalCtrl: ModalController,
    public objectService: GenericObjectService
  ) {
    this.readDatas();
  }

  onQuickFilterChanged(quickFilter) {
    let filter = (<HTMLInputElement>document.getElementById(quickFilter)).value.toLowerCase();
  }
  /**
   * Read the owned positive list.
   */
  readDatas() {
    let subs = this.educationService.getMyPositivLists().subscribe(
      (val) => { this.rowData = val },
      (err) => { console.log(err) },
      () => { subs.unsubscribe() }
    )
  }

  toggleSelect(plist){
    if(this.selectedIds.indexOf(plist.id) == -1){
      this.selectedIds.push(plist.id)
    }else{
      this.selectedIds = this.selectedIds.filter(value => value != plist.id)
    }
  }
  /**
   * Add or edit positive list
   * @param ev 
   * @param positivList 
   */
  async redirectToAddEdit(positivList: PositivList) {
    let action = 'modify';
    if (!positivList) {
      positivList = new PositivList();
      delete positivList.id;
      action = 'add';
    }
    const modal = await this.modalCtrl.create({
      component: ObjectsEditComponent,
      cssClass: 'medium-modal',
      componentProps: {
        objectType: "education/proxy/positiveList",
        objectAction: action,
        object: positivList
      },
      animated: true,
      showBackdrop: true
    });
    (await modal).present();
  }

  /**
   * Activate the selected positive lists in the selected room
   * @param ev 
   */
  activate(ev: Event) {
    this.objectService.requestSent();
    let subs = this.educationService.activatePositivListInRoom(this.educationService.selectedRoom.id, this.selectedIds).subscribe({
      next: (val) => { this.objectService.responseMessage(val) },
      error: (err) => { this.objectService.errorMessage(err) },
      complete: () => { subs.unsubscribe() }
    })
  }

  /**
   * Deactivate the selected positive lists in the selected room
   * @param ev 
   */
  deactivate(ev: Event) {
    this.objectService.requestSent();
    let subs = this.educationService.deactivatePositivListInRoom(this.educationService.selectedRoom.id).subscribe({
      next: (val) => { this.objectService.responseMessage(val) },
      error: (err) => { this.objectService.errorMessage(err) },
      complete: () => { subs.unsubscribe() }
    })
  }
}
