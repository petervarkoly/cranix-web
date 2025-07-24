import { Component } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
//Own stuff
import { AuthenticationService } from 'src/app/services/auth.service';
import { ObjectsEditComponent } from 'src/app/shared/objects-edit/objects-edit.component';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { SoftwareService } from 'src/app/services/softwares.service';
import { Package, Software } from 'src/app/shared/models/data-model';
import { SoftwareLicensesComponent } from 'src/app/shared/actions/software-licenses/software-licenses.component';

@Component({
  standalone: false,
    selector: 'cranix-software-packages',
  templateUrl: './software-packages.component.html',
  styleUrls: ['./software-packages.component.scss'],
})
export class SoftwarePackagesComponent {
  context;
  rowData: Package[];
	availableSoftwares: Software[];
  isDownloadOpen: boolean = false;
  constructor(
    public authService: AuthenticationService,
    public objectService: GenericObjectService,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public softwareService: SoftwareService
  ) {
    console.log('SoftwarePackagesComponent called')
    this.context = { componentParent: this };
    this.readInstallableSoftware();
  }

  async readInstallableSoftware() {
    this.softwareService.readInstallableSoftwares();
    await this.sleep(3000);
  }
  sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }
  
  onQuickFilterChanged(quickFilter) {
    let filter = (<HTMLInputElement>document.getElementById(quickFilter)).value.toLowerCase();
  }

  public redirectToDelete = (software: Software) => {
    this.objectService.deleteObjectDialog(software, 'software','')
  }

  /**
   * Function to select the software packages to download
   * @param ev
   */
  downloadSoftwares(ev: any) {
    this.isDownloadOpen = true
  }

  /**
   * Modify or add a software package
   * @param ev
   * @param software
   */
  async redirectToEdit(software: Software) {
    let action = 'modify';
    if (!software) {
      action = 'add';
      software = new Software();
    }
    delete software.softwareFullNames;
    delete software.softwareVersions;
    delete software.sourceAvailable;
    this.authService.log(software);
    const modal = await this.modalCtrl.create({
      component: ObjectsEditComponent,
      componentProps: {
        objectType: "software",
        objectAction: action,
        object: software
      },
      cssClass: 'medium-modal',
      animated: true,
      showBackdrop: true
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.readInstallableSoftware();
      if (dataReturned.data) {
        this.authService.log("Object was created or modified", dataReturned.data)
      }
    });
    (await modal).present();
  }

  async redirectToLicenses(software) {
    const modal = await this.modalCtrl.create({
      component: SoftwareLicensesComponent,
      componentProps: {
        software: software
      },
      cssClass: 'big-modal',
      animated: true,
      showBackdrop: true
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data) {
        this.authService.log("Object was created or modified", dataReturned.data)
      }
    });
    (await modal).present(); 

  }
}
