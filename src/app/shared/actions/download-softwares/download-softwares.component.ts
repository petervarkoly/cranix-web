import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
//Own stuff
import { SoftwareService } from 'src/app/services/softwares.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { Package } from 'src/app/shared/models/data-model';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  standalone: false,
  selector: 'cranix-download-softwares',
  templateUrl: './download-softwares.component.html',
  styleUrls: ['./download-softwares.component.scss'],
})
export class DownloadSoftwaresComponent {
  context;
  selected: Package[];
  constructor(
    public authService: AuthenticationService,
    public objectService: GenericObjectService,
    private softwareService: SoftwareService,
    public modalCtlr: ModalController
  ) {
    this.context = { componentParent: this };
  }
  closeWindow() {
    this.modalCtlr.dismiss();
  }
  async startDownload() {
    if (this.selected.length == 0) {
      console.log('not selected')
      this.objectService.selectObject();
      return;
    } else {
      let toDownload: string[] = [];
      for (let p of this.selected) {
        toDownload.push(p.name);
      }
      this.softwareService.downloadSoftwares(toDownload).subscribe(
        (val) => {
          this.objectService.responseMessage(val);
          if (val.code == "OK") {
            this.closeWindow();
          }
        }
      )
    }
  }
}
