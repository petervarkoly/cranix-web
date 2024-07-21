import { addIcons } from 'ionicons';
import { checkmarkSharp, close } from 'ionicons/icons';
import { IonHeader, IonButtons, IonButton, IonIcon, IonContent, IonLabel } from '@ionic/angular/standalone';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { GenericObjectService } from 'src/app/services/generic-object.service';

@Component({
  selector: 'cranix-set-validity',
  imports: [ IonHeader, IonButtons, IonButton, IonIcon, IonContent, IonLabel ],
  templateUrl: './set-validity.component.html',
  styleUrls: ['./set-validity.component.scss'],
})
export class SetValidityComponent implements OnInit {

  institute = {
    "id" : 0,
    "validity" : new Date()
  }
  inactive = false
  @Input() objectIds;
  constructor(
    public modalController: ModalController,
    public objectService: GenericObjectService
  ) {
    addIcons ({ checkmarkSharp, close }); }

  ngOnInit() {}

  async onSubmit() {
    this.inactive = true
    for( let id of this.objectIds ) {
      this.institute.id = id;
      this.objectService.modifyObject(this.institute,'institute').subscribe(
        (val) => { this.objectService.responseMessage(val) }
      )
    }
    await new Promise(f => setTimeout(f, 4000));
    this.objectService.getAllObject('institute')
    this.modalController.dismiss()
  }
}
