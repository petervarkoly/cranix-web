import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

//Own stuff
import { AuthenticationService } from 'src/app/services/auth.service';
import { SoftwareService } from 'src/app/services/softwares.service'
import { Category } from 'src/app/shared/models/data-model';
import { EditInstallationSetComponent } from 'src/app/protected/cranix/softwares/edit-set/edit-installation-set.component';
import { GenericObjectService } from 'src/app/services/generic-object.service';

@Component({
  standalone: false,
    selector: 'cranix-installation-sets',
  templateUrl: './installation-sets.component.html',
  styleUrls: ['./installation-sets.component.scss'],
})
export class InstallationSetsComponent {
  context;

  constructor(
    public authService: AuthenticationService,
    public modalCtrl: ModalController,
    public objectService: GenericObjectService,
    public router: Router,
    public softwareService: SoftwareService
  ) {
    this.context = { componentParent: this };
    this.softwareService.readInstallationsSets();
    this.softwareService.readInstallableSoftwares();
  }

  async redirectToEdit(installation: Category) {
    let action = "add"
    if (installation) {
      this.softwareService.selectedInstallationSet = installation;
      action = "modify";
    } else {
      this.softwareService.selectedInstallationSet = null;
    }
    const modal = await this.modalCtrl.create({
      component: EditInstallationSetComponent,
      cssClass: 'big-modal',
      componentProps: {
        objectAction: action
      },
      animated: true,
      showBackdrop: true
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.softwareService.readInstallationsSets()
      if (dataReturned.data) {
        this.authService.log("Object was created or modified", dataReturned.data)
      }
    });
    (await modal).present();
  }
  writeConfig() {
    let sub = this.softwareService.writeStateFiles().subscribe(
      (val) => { this.objectService.responseMessage(val) }
    )
  }
  applyState() {
    let sub = this.softwareService.applyState().subscribe(
      (val) => { this.objectService.responseMessage(val) }
    )
  }
  redirectToDelete(installation: Category) {
    this.softwareService.deleteInstallationsSet(installation);
  }
}
