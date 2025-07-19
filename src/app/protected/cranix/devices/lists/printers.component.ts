import { Component } from '@angular/core';
import { AlertController, PopoverController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

//own modules

import { AuthenticationService } from 'src/app/services/auth.service';
import { AddPrinterComponent } from './../add-printer/add-printer.component';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { PrintersService } from 'src/app/services/printers.service';
import { SelectColumnsComponent } from 'src/app/shared/select-columns/select-columns.component';
import { Device, Printer } from 'src/app/shared/models/data-model'
import { YesNoBTNRenderer } from 'src/app/pipes/ag-yesno-renderer';

@Component({
  standalone: false,
  selector: 'cranix-printers',
  templateUrl: './printers.component.html',
  styleUrls: ['./printers.component.scss'],
})
export class PrintersComponent {
  selectedRoom;
  objectKeys: string[] = [];
  displayedColumns: string[] = ['name', 'model', 'deviceName', 'acceptingJobs', 'activeJobs', 'windowsDriver'];
  context;
  selection: Printer[] = [];
  selectedIds: number[] = [];

  constructor(
    public authService: AuthenticationService,
    public alertController: AlertController,
    public languageS: LanguageService,
    public modalCtrl: ModalController,
    public objectService: GenericObjectService,
    public popoverCtrl: PopoverController,
    public printersService: PrintersService,
    public route: Router
  ) {
    this.context = { componentParent: this };
    this.objectKeys = Object.getOwnPropertyNames(new Printer());
    delete this.objectService.selectedObject;
  }
  async redirectToEdit(printer: Printer) {
    if (printer) {
      const modal = await this.modalCtrl.create({
        component: AddPrinterComponent,
        cssClass: "medium-modal",
        componentProps: {
          action: "modify",
          object: printer
        },
        animated: true,
        showBackdrop: true
      });
      (await modal).present();
    }else{
      this.addDevice();
    }
  }

  async addPrinter() {
    const modal = await this.modalCtrl.create({
      component: AddPrinterComponent,
      cssClass: 'medium-modal',
      componentProps: {
        action: 'queue'
      },
      animated: true,
      backdropDismiss: false
    });
    (await modal).present()
  }

  async addDevice() {
    const modal = await this.modalCtrl.create({
      component: AddPrinterComponent,
      cssClass: 'medium-modal',
      componentProps: {
        action: 'add'
      },
      animated: true,
      backdropDismiss: false
    });
    (await modal).present()
  }

  reset(id: number) {
    let subs = this.printersService.reset(id).subscribe(
      (val) => {
        this.objectService.responseMessage(val);
        if (val.code == "OK") {
          this.objectService.getAllObject('printer');
          this.modalCtrl.dismiss();
        }
      },
      (error) => {
        this.objectService.errorMessage("ServerError" + error);
        this.authService.log(error);
      },
      () => { subs.unsubscribe() }
    )
  }

  toggle(data, what: string, yesno: boolean) {
    let subs = this.printersService.toggle(data.id, what, yesno).subscribe(
      (val) => {
        this.objectService.responseMessage(val);
        this.objectService.getAllObject('printer');
      },
      (error) => {
        this.objectService.errorMessage("ServerError" + error);
        this.authService.log(error);
      },
      () => { subs.unsubscribe() }
    )
  }
}
