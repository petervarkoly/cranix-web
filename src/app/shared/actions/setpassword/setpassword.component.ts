import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SystemService } from 'src/app/services/system.service';

@Component({
  standalone: false,
    selector: 'cranix-setpassword',
  templateUrl: './setpassword.component.html',
  styleUrls: ['./setpassword.component.scss'],
})
export class SetpasswordComponent implements OnInit {

  setPassword = {
    mustChange: true,
    password: "",
    password2:""
  }

  @Input() type;
  constructor(
    public modalController: ModalController,
    public systemService: SystemService
  ) {
    console.log('type is:', this.type);
    this.systemService.getSystemConfigValue("DEFAULT_MUST_CHANGE").subscribe(
      (val) => {
        console.log(val)
        if( val == "no"){
        this.setPassword.mustChange = false
      }}
    )
  }

  ngOnInit() {
  }

  onSubmit() {
    this.modalController.dismiss(this.setPassword);
  }

}
