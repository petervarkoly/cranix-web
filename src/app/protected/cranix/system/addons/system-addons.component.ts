import { TranslateModule } from '@ngx-translate/core';
import { CranixToolbarComponent } from 'src/app/protected/toolbar/toolbar.component';
import { IonSelect, IonSelectOption, IonModal, IonButtons, IonButton, IonContent } from '@ionic/angular/standalone';
import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/services/system.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { AlertController } from '@ionic/angular/standalone';
import { LangChangeEvent } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
    selector: 'cranix-system-addons',
  imports: [ TranslateModule, CranixToolbarComponent, IonSelect, IonSelectOption, IonModal, IonButtons, IonButton, IonContent ],
    templateUrl: './system-addons.component.html',
    styleUrls: ['./system-addons.component.scss'],
    standalone: true,
})
export class SystemAddonsComponent implements OnInit {

  action = "";
  key = "";
  disabled = false;
  isModalOpen = false;
  modalContent = "";


  constructor(
    public alertController: AlertController,
    public languageService: LanguageService,
    public objectService: GenericObjectService,
    public systemService: SystemService
  ) { }

  ngOnInit() {
    this.systemService.getAddons();
  }

  changeAddon() {
    this.action = ""
    this.key = ""
    console.log(this.systemService.selectedAddon,
      this.systemService.addonActions,
      this.systemService.addonKeys)
  }

  async applyAction() {
    if (!this.action) {
      return
    }
    this.disabled = true;
    const alert = await this.alertController.create({
      header: this.languageService.trans("Do you want to execute following addon action:")
        + " '" + this.systemService.selectedAddon + "'"
        + " '" + this.action + "'",
      buttons: [
        {
          text: this.languageService.trans('Cancel'),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.action = "";
          }
        }, {
          text: this.languageService.trans('OK'),
          handler: () => {
            this.systemService.applyAction(this.action).subscribe(
              (val) => {
                this.disabled = false;
                this.objectService.responseMessage(val)
                this.action = "";
              }
            )
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

  getKey() {
    if (!this.key) {
      return
    }
    this.objectService.requestSent();
    this.disabled = true;
    this.systemService.getKey(this.key).subscribe(
      (val) => {
        this.modalContent = val;
        this.disabled = false;
        this.key = "";
        this.isModalOpen = true;
      }
    )
  }

  closeModal() {
    this.key = "";
    this.isModalOpen = false;
  }
}
