import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { close, trash, addCircle } from 'ionicons/icons';
import { IonButtons, IonButton, IonIcon, IonCol, IonItem } from '@ionic/angular/standalone';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { SystemService } from 'src/app/services/system.service';
import { Acl } from 'src/app/shared/models/server-models';

@Component({
    selector: 'cranix-manage-acls',
  imports: [ TranslateModule, IonButtons, IonButton, IonIcon, IonCol, IonItem ],
    templateUrl: './manage-acls.component.html',
    styleUrls: ['./manage-acls.component.scss'],
    standalone: true,
})
export class ManageAclsComponent implements OnInit {

  name = "";
  availabeAcls = [];
  acls = [];

  @Input() objectType;
  @Input() object;
  constructor(
    public  modalController: ModalController,
    private systemService: SystemService
  ) {
    addIcons ({ close, trash, addCircle }); }

  ngOnInit() {
    if (this.objectType == 'group') {
      this.name = this.object.description;
    } else {
      this.name = this.object.uid + ' ( ' + this.object.givenName + ' ' + this.object.surName + ')'
    }
    this.readAcls();
  }

  readAcls() {
    this.acls = []
    this.availabeAcls = []
    let sub1 = this.systemService.getAclsOfObject(this.objectType, this.object.id).subscribe(
      (val) => {
        this.acls = val
        this.acls.sort((a, b) => (a.acl > b.acl) ? 1 : (b.acl > a.acl) ? -1 : 0)
      },
      (err) => { console.log(err) },
      () => { sub1.unsubscribe() }
    )
    let sub2 = this.systemService.getAvailableAclsOfObject(this.objectType, this.object.id).subscribe(
      (val) => {
        this.availabeAcls = val
        this.availabeAcls.sort((a, b) => (a.acl > b.acl) ? 1 : (b.acl > a.acl) ? -1 : 0)
      },
      (err) => { console.log(err) },
      () => { sub2.unsubscribe() }
    )
  }

  removeAcl(acl: Acl) {
    acl.allowed = false;
    this.setAcl(acl);
  }

  addAcl(acl: Acl) {
    acl.allowed = true;
    this.setAcl(acl);
  }

  setAcl(acl: Acl) {
    let sub2 = this.systemService.setAclOfObject(this.objectType, this.object.id, acl).subscribe(
      (val) => {
        console.log(val)
        this.readAcls()
      },
      (err) => { console.log(err) },
      () => { sub2.unsubscribe() }
    )
  }
}
