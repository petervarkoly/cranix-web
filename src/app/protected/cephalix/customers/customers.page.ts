import { Component, OnInit, Input } from '@angular/core';
import { GridApi, ColDef } from 'ag-grid-community';
import { PopoverController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

//own modules
import { ObjectsEditComponent } from 'src/app/shared/objects-edit/objects-edit.component';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { Customer, Institute } from 'src/app/shared/models/cephalix-data-model'
import { AuthenticationService } from 'src/app/services/auth.service';
import { CephalixService } from 'src/app/services/cephalix.service';

@Component({
  standalone: false,
    selector: 'cranix-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage{
  objectKeys: string[] = [];
  displayedColumns: string[] = ['id', 'name', 'uuid', 'locality', 'ipVPN', 'regCode', 'validity'];
  sortableColumns: string[] = ['id', 'name', 'uuid', 'locality', 'ipVPN', 'regCode', 'validity'];
  context;
  myInstitutes: Institute[] = [];

  constructor(
    public authService: AuthenticationService,
    public objectService: GenericObjectService,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public languageS: LanguageService,
    private storage: Storage
  ) {
    this.context = { componentParent: this };
    this.objectKeys = Object.getOwnPropertyNames(new Customer());
  }
  /**
 * Open the actions menu with the selected object ids.
 * @param ev 
 */
  async redirectToAddInstitute(customer: Customer) {
    let institute = new Institute();
    institute.cephalixCustomerId = customer.id;
    const modal = await this.modalCtrl.create({
      component: ObjectsEditComponent,
      componentProps: {
        objectType: "institute",
        objectAction: "add",
        object: institute,
        objectKeys: Object.getOwnPropertyNames(institute)
      },
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
  async redirectToEdit(customer: Customer) {
    let action = 'modify';
    if (customer == null) {
      customer = new Customer();
      action = 'add';
    }
    const modal = await this.modalCtrl.create({
      component: ObjectsEditComponent,
      componentProps: {
        objectType: "customer",
        objectAction: action,
        object: customer,
        objectKeys: this.objectKeys
      },
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

  async editInstitutes(customer: Customer) {
    const modal = await this.modalCtrl.create({
      component: EditInstitutes,
      cssClass: 'big-modal',
      componentProps: {
        'customer': customer
      }
    });
    await modal.present();
  }
}

@Component({
  standalone: false,
    selector: 'edit-institutes-component',
  templateUrl: 'edit-institutes.html'
})
export class EditInstitutes implements OnInit {
  disabled: boolean = false;
  myInstituteIds: number[] = [];
  myInstitutes: Institute[] = [];
  rowData: Institute[];
  owned: boolean = false;
  @Input() customer
  constructor(
    public authService: AuthenticationService,
    public cephalixService: CephalixService,
    public modalCtrl: ModalController,
    public objectService: GenericObjectService
  ) {
    this.rowData = this.objectService.allObjects['institute'];
  }

  ngOnInit(): void {
    this.myInstitutes = [];
    this.myInstituteIds = [];
    for (let institute of this.objectService.allObjects['institute']) {
      if (institute.cephalixCustomerId && institute.cephalixCustomerId == this.customer.id) {
        this.myInstituteIds.push(institute.id);
        this.myInstitutes.push(institute)
      }
    }
    console.log(this.myInstituteIds)
  }

  async onSubmit() {
    this.disabled = true
    let newMyInstituteIds: number[] = [];
    for (let institute of this.myInstitutes) {
      newMyInstituteIds.push(institute.id)
    }
    for (let i of newMyInstituteIds) {
      if (this.myInstituteIds.indexOf(i) == -1) {
        this.cephalixService.addInstituteToCustomer(i, this.customer.id);
      }
    }
    for (let i of this.myInstituteIds) {
      if (newMyInstituteIds.indexOf(i) == -1) {
        this.cephalixService.deleteInstituteFromCustomer(i, this.customer.id);
      }
    }
    await new Promise(f => setTimeout(f, 3000));
    this.objectService.getAllObject('institute')
    this.modalCtrl.dismiss()
  }
}
