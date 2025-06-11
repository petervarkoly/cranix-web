import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SystemService } from 'cranix-common/dist/services/system.service';
import { Acl } from 'src/app/shared/models/server-models';

@Component({
  selector: 'cranix-manage-acls',
  templateUrl: './manage-acls.component.html',
  styleUrls: ['./manage-acls.component.scss'],
})
export class ManageAclsComponent implements OnInit {

  name = "";
  availabeAcls: Acl[] = [];
  acls: Acl[] = [];
  rowData: Acl[] = []

  @Input() objectType;
  @Input() object;
  constructor(
    public  modalController: ModalController,
    private systemService: SystemService
  ) { }

  ngOnInit() {
    if (this.objectType == 'group') {
      this.name = this.object.description;
    } else {
      this.name = this.object.uid + ' ( ' + this.object.givenName + ' ' + this.object.surName + ')'
    }
    this.readAcls();
  }

  readAcls() {
    this.acls = []
    this.availabeAcls = []
    let tmp = []
    let sub1 = this.systemService.getAclsOfObject(this.objectType, this.object.id).subscribe(
      (val) => {
        this.acls = val
        let sub2 = this.systemService.getAvailableAclsOfObject(this.objectType, this.object.id).subscribe(
          (val) => {
            for(let o of this.acls){
              this.availabeAcls.push(o)
            }
            for(let o of val){
              this.availabeAcls.push(o)
            }
            this.availabeAcls.sort((a, b) => (a.acl > b.acl) ? 1 : (b.acl > a.acl) ? -1 : 0)
            for( let o of this.availabeAcls){
              tmp.push(o)
            }
            this.rowData = tmp
          }
        )
      }
    )
  }

  onQuickFilterChanged(){
    let filter = (<HTMLInputElement>document.getElementById('aclsFilter')).value.toLowerCase();
    console.log(filter)
    let tmp: Acl[] =[]
    for(let o of this.availabeAcls){
      if(o.acl.indexOf(filter) != -1){
        tmp.push(o)
      }
    }
    console.log(tmp.length)
    this.rowData = tmp
    console.log("Data copied")
  }
  isAllowed(acl: Acl){
    for(let o of this.acls){
      if(o.id && o.id == acl.id){
        return true;
      }
    }
    return false;
  }

  removeAcl(acl: Acl) {
    acl.allowed = false;
    this.setAcl(acl);
  }

  addAcl(acl: Acl) {
    acl.allowed = true;
    this.setAcl(acl);
  }

  setAcl(acl: Acl) {
    let sub2 = this.systemService.setAclOfObject(this.objectType, this.object.id, acl).subscribe(
      (val) => {
        console.log(val)
        this.readAcls()
      },
      (err) => { console.log(err) },
      () => { sub2.unsubscribe() }
    )
  }
}
