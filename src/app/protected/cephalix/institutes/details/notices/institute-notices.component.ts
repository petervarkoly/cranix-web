import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';
//own modules
import { Institute, Notice } from 'cranix-common/dist/models/cephalix-data-model';
import { GenericObjectService } from 'cranix-common/dist/services/generic-object.service';
import { CephalixService } from 'cranix-common/dist/services/cephalix.service';
import { ObjectsEditComponent } from 'cranix-common/dist/components/objects-edit/objects-edit.component';

@Component({
  selector: 'cranix-institute-notices',
  templateUrl: './institute-notices.component.html',
  styleUrls: ['./institute-notices.component.scss'],
})
export class InstituteNoticesComponent implements OnInit {
  object: Institute = null;
  objectKeys: string[] = [];
  notices: Notice[] = [];
  constructor(
    public translateService: TranslateService,
    public formBuilder: FormBuilder,
    public modalCtrl: ModalController,
    public objectService: GenericObjectService,
    public cephalixService: CephalixService
  ) {
    this.object = <Institute>this.objectService.selectedObject;
  }

  ngOnInit() {
    this.getNotices()
  }

  public ngAfterViewInit() {
    while (document.getElementsByTagName('mat-tooltip-component').length > 0) { document.getElementsByTagName('mat-tooltip-component')[0].remove(); }
  }

  getNotices() {
    let sub = this.cephalixService.getNoticesOfInst(this.object.id).subscribe(
      (val) => { this.notices = val },
      (err) => {
        console.log('getNotices' + this.object.id);
        console.log(err)
      },
      () => { sub.unsubscribe(); })
  }

  async redirectToAdd(ev: Event) {
    let notice = new Notice();
    notice.cephalixInstituteId = this.object.id;
    const modal = await this.modalCtrl.create({
      component: ObjectsEditComponent,
      componentProps: {
        objectType: "notice",
        objectAction: 'add',
        object: notice
      },
      animated: true,
      showBackdrop: true
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data) {
        this.getNotices();
        console.log("Object was created:", dataReturned.data)
      }
    });
    (await modal).present();
  }

  redirectToDelete(notice) {
    console.log(notice)
    this.cephalixService.deleteNotice(notice.id).subscribe(
      (val) => {
        this.objectService.responseMessage(val);
        this.getNotices();
      }
    )
  }
}
