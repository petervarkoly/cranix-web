import { Component } from '@angular/core';

//own modules
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { CephalixService } from 'src/app/services/cephalix.service';
import { Institute } from 'src/app/shared/models/cephalix-data-model'
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  standalone: false,
    selector: 'cranix-institute-status',
  templateUrl: './institute-status.component.html',
  styleUrls: ['./institute-status.component.scss'],
})
export class InstituteStatusComponent {
  object: Institute = null;
  context;
  rowData = [];

  constructor(
    public authService: AuthenticationService,
    public cephalixService: CephalixService,
    public objectService: GenericObjectService
  ) {
    this.object = <Institute>this.objectService.selectedObject;
    this.context = { componentParent: this };

    let subs = this.cephalixService.getStatusOfInstitute(this.object.id).subscribe(
      (val) => {
        for( let obj of val){
          delete obj.cephalixInstituteId
          delete obj.modified
        }
        this.rowData = val 
      },
      (err) => { this.authService.log(err) },
      () => { subs.unsubscribe() }
    )
  }
}
