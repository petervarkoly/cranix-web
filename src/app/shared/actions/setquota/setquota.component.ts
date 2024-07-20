import { IonHeader, IonButtons, IonButton, IonIcon, IonContent, IonLabel, IonInput } from '@ionic/angular/standalone';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';


@Component({
  selector: 'cranix-setquota',
  imports: [ IonHeader, IonButtons, IonButton, IonIcon, IonContent, IonLabel, IonInput ],
  templateUrl: './setquota.component.html',
  styleUrls: ['./setquota.component.scss'],
})
export class SetquotaComponent implements OnInit {

  @Input() type: string;
  quota = 500;
  title = "Set filesystemquota for the selected users";
  constructor(
    public modalController: ModalController
  ) {
  }

  ngOnInit() {
    if(this.type == "mail") {
      this.title = "Set mailsystemquota for the selected users";
      this.quota = 50;
    }
  }

  onSubmit() {
    this.modalController.dismiss(this.quota);
  }

}
