import { IonHeader, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonLabel, IonInput, IonItem, IonCheckbox } from '@ionic/angular/standalone';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { SystemService } from 'src/app/services/system.service';

@Component({
  selector: 'cranix-setpassword',
  imports: [ IonHeader, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonLabel, IonInput, IonItem, IonCheckbox ],
  templateUrl: './setpassword.component.html',
  styleUrls: ['./setpassword.component.scss'],
})
export class SetpasswordComponent implements OnInit {

  @Input() type;

  setPassword = {
    mustChange: true,
    password: "",
    password2:""
  }

  showPassword: boolean = false

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
