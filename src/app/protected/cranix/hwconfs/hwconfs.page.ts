import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

//own modules
import { ObjectsEditComponent } from 'src/app/shared/objects-edit/objects-edit.component';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { Hwconf } from 'src/app/shared/models/data-model'
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  standalone: false,
    selector: 'cranix-hwconfs',
  templateUrl: './hwconfs.page.html',
  styleUrls: ['./hwconfs.page.scss'],
})
export class HwconfsPage {
  objectKeys: string[] = [];
  context;
  constructor(
    public authService: AuthenticationService,
    public languageS: LanguageService,
    public objectService: GenericObjectService,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public route: Router
  ) {
    this.context = { componentParent: this };
    this.objectKeys = Object.getOwnPropertyNames(new Hwconf());
  }

  async redirectToEdit(hwconf: Hwconf) {
    if (hwconf) {
      this.objectService.selectedObject = hwconf;
      let err = this.route.navigate(['/pages/cranix/hwconfs/' + hwconf.id]);
      console.log(err)
    } else {
      const modal = await this.modalCtrl.create({
        component: ObjectsEditComponent,
        componentProps: {
          objectType: "hwconf",
          objectAction: "add",
          object: new Hwconf(),
          objectKeys: this.objectKeys
        },
        animated: true,
        showBackdrop: true
      });
      (await modal).present();
    }
  }
}
