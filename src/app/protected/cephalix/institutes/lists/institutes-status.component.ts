import { Component, ViewEncapsulation } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

//own modules
import { ActionsComponent } from 'src/app/shared/actions/actions.component';
import { DateTimeCellRenderer } from 'src/app/pipes/ag-datetime-renderer';
import { FileSystemUsageRenderer } from 'src/app/pipes/ag-filesystem-usage-renderer';
import { InstituteStatusRenderer } from 'src/app/pipes/ag-institute-status-renderer';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { CephalixService } from 'src/app/services/cephalix.service';
import { LanguageService } from 'src/app/services/language.service';
import { SelectColumnsComponent } from 'src/app/shared/select-columns/select-columns.component';
import { InstituteStatus } from 'src/app/shared/models/cephalix-data-model'
import { UpdateRenderer } from 'src/app/pipes/ag-update-renderer';
import { AuthenticationService } from 'src/app/services/auth.service';
import { DateCellRenderer } from 'src/app/pipes/ag-date-renderer';
@Component({
  standalone: false,
    selector: 'cranix-institutes-status',
  templateUrl: './institutes-status.component.html',
  styleUrls: ['./institutes-status.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InstitutesStatusComponent {
  context;
  rowData: any[]
  selectedStatus: InstituteStatus = null;
  isStatusModalOpen: boolean = false;
  now

  constructor(
    public authService: AuthenticationService,
    public cephalixService: CephalixService,
    public objectService: GenericObjectService,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public languageS: LanguageService,
    public route: Router
  ) {
    this.context = { componentParent: this };
    this.now = new Date().getTime();
    this.readStatus()
  }
  readStatus() {
    this.authService.log('WillEnter EVENT')
    let subs = this.cephalixService.getStatusOfInstitutes().subscribe({
      next: (val) => {
        val.sort((status1: InstituteStatus, status2: InstituteStatus) => {
          let i1 = this.objectService.getObjectById('institute', status1.cephalixInstituteId)
          let i2 = this.objectService.getObjectById('institute', status2.cephalixInstituteId)
          return i1.name.toUpperCase() < i2.name.toUpperCase() ? -1 : 1
        });
        this.rowData = val;
      },
      error: (err) => { this.authService.log(err) },
      complete: () => { subs.unsubscribe() }
    })
  }
  errorStatus(status: InstituteStatus) {
    if (status.errorMessages) {
      return "danger";
    }
    return "success"
  }

  fileSystemError(fs: string) {
    if (!fs) {
      return false
    }
    let result = fs.split(" ");
    if (result) {
      if (Number(result[1].replace('%', '')) > 80) {
        return true
      }
      else if (Number(result[2].replace('%', '')) > 80) {
        return true
      }
    }
    return false
  }
  fsStatus(status: InstituteStatus) {
    if (this.fileSystemError(status.rootUsage) ||
      this.fileSystemError(status.srvUsage) ||
      this.fileSystemError(status.homeUsage)) {
      return "danger"
    }
    return "success"
  }

  connectStatus(status: InstituteStatus) {
    if (this.now - status.created > 36000000) {
      return "danger"
    }
    return "success"
  }
  showStatus(status: InstituteStatus) {
    this.selectedStatus = status;
    this.isStatusModalOpen = true;
  }
  closeStatusModal(modal){
    modal.dismiss()
    this.selectedStatus = null
    this.isStatusModalOpen = false
  }

  public redirectToUpdate = (cephalixInstituteId: number) => {
    let sub = this.cephalixService.updateById(cephalixInstituteId).subscribe({
      next: (val) => { this.authService.log(val) },
      error: (error) => { this.authService.log(error) },
      complete: () => { sub.unsubscribe(); }
    });
  }
  
  redirectToEdit(status: InstituteStatus) {
    this.objectService.selectedObject = this.objectService.getObjectById("institute", status.cephalixInstituteId);
    this.route.navigate([`/pages/cephalix/institutes/${status.cephalixInstituteId}`]);
  }

  sortStatus(status1: InstituteStatus, status2: InstituteStatus) {
    console.log(status1, status2)
    if (status1 && status2) {
      let i1 = this.objectService.getObjectById('institute', status1.cephalixInstituteId)
      let i2 = this.objectService.getObjectById('institute', status2.cephalixInstituteId)
      return i1.name < i2.name ? 1 : -1
    }
    return 0
  }
}