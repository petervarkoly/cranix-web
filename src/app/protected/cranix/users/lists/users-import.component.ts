import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/internal/operators/takeWhile';

//own modules
import { ShowImportComponent } from 'cranix-common/dist/components/actions/show-import/show-import.component';
import { UsersService } from 'cranix-common/dist/services/users.service';
import { LanguageService } from 'cranix-common/dist/services/language.service';
import { UsersImport } from 'cranix-common/dist/models/data-model';
import { ObjectsEditComponent } from 'cranix-common/dist/components/objects-edit/objects-edit.component';
import { GenericObjectService } from 'cranix-common/dist/services/generic-object.service';
import { AuthenticationService } from 'cranix-common/dist/services/auth.service';

@Component({
  selector: 'cranix-users-import',
  templateUrl: './users-import.component.html',
  // styleUrls: ['./user-import.component.scss'],
})
export class UsersImportComponent implements OnInit {
  alive: boolean = true;
  imports: UsersImport[] = [];
  runningImport: UsersImport = null;
  constructor(
    public authService: AuthenticationService,
    public objectService: GenericObjectService,
    private usersService: UsersService,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public languageS: LanguageService,
    public route: Router
  ) { }

  ngOnInit() {
    this.refreshImports();
  }

  async stopImport() {
    this.objectService.requestSent();
    let subs = this.usersService.stopRunningImport().subscribe(
      (val) => { this.objectService.responseMessage(val) },
      (err) => { this.objectService.errorMessage(err) },
      () => {
        this.refreshImports()
        subs.unsubscribe()
      }
    )
  }

  async startImport() {
    let userImport = new UsersImport();
    userImport.importFile = "";
    delete userImport.result;
    const modal = await this.modalCtrl.create({
      component: ObjectsEditComponent,
      cssClass: "medium-modal",
      componentProps: {
        objectType: "userImport",
        objectAction: "add",
        object: userImport
      },
      animated: true,
      showBackdrop: true
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.refreshImports()
    });
    (await modal).present();
  }

  async showImport(ev: Event, userImport: UsersImport) {
    const popover = await this.modalCtrl.create({
      component: ShowImportComponent,
      cssClass: 'big-modal',
      componentProps: {
        import: userImport
      },
      animated: true,
      showBackdrop: true
    });
    (await popover).present();
  }

  onResize(ev: Event) {
  }
  restartImport(startTime: string) {
    this.objectService.requestSent();
    let subs = this.usersService.restartUserImport(startTime).subscribe(
      (val) => { this.objectService.responseMessage(val) },
      (err) => { this.objectService.errorMessage(err) },
      () => {
        this.refreshImports()
        subs.unsubscribe()
      }
    )
  }
  downloadImport(startTime: string, type: string) {
    this.objectService.requestSent();
    this.usersService.getImportAs(startTime, type)
      .pipe(takeWhile(() => this.alive))
      .subscribe({
        next: (x) => {
          var newBlob = new Blob([x.body], { type: x.body.type });

          // IE doesn't allow using a blob object directly as link href
          /* instead it is necessary to use msSaveOrOpenBlob
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveOrOpenBlob(newBlob);
              return;
          }*/

          // For other browsers:
          // Create a link pointing to the ObjectURL containing the blob.
          const data = window.URL.createObjectURL(newBlob);

          var link = document.createElement('a');
          link.href = data;
          link.download = x.headers.get('content-disposition').replace('attachment; filename=', '');
          // this is necessary as link.click() does not work on the latest firefox
          link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

          setTimeout(function () {
            // For Firefox it is necessary to delay revoking the ObjectURL
            window.URL.revokeObjectURL(data);
            link.remove();
          }, 100);
        },
        error: (err) => {
          this.objectService.errorMessage(err);
        }
      })
    //TODO
  }
  deleteImport(startTime: string) {
    this.objectService.requestSent();
    let subs = this.usersService.deleteUserImport(startTime).subscribe(
      (val) => { this.objectService.responseMessage(val) },
      (err) => { this.objectService.errorMessage(err) },
      () => {
        this.refreshImports()
        subs.unsubscribe()
      }
    )
  }

  refreshImports() {
    let subs = this.usersService.getAllImports().subscribe(
      (val) => {
        this.imports = val.sort(function (a, b) {
          if (a.startTime < b.startTime) {
            return 1;
          }
          if (a.startTime > b.startTime) {
            return -1;
          }
          return 0;
        })
      },
      (err) => { console.log(err) },
      () => { subs.unsubscribe() }
    )
    let subs1 = this.usersService.getRunningImport().subscribe(
      (val) => { this.runningImport = val },
      (err) => { console.log(err) },
      () => { subs1.unsubscribe() }
    )
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
