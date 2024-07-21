import { addIcons } from 'ionicons';
import { checkmarkSharp, close } from 'ionicons/icons';
import { IonHeader, IonButtons, IonButton, IonIcon, IonContent, IonList, IonCheckbox } from '@ionic/angular/standalone';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'cranix-select-columns',
  imports: [ IonHeader, IonButtons, IonButton, IonIcon, IonContent, IonList, IonCheckbox ],
  templateUrl: './select-columns.component.html',
  styleUrls: ['./select-columns.component.scss'],
})
export class SelectColumnsComponent implements OnInit {

  object: any = {};
  @Input() objectPath: string = "";
  @Input() columns: string[] = [];
  @Input() selected: string[] = [];
  constructor(
    public formBuilder: FormBuilder,
    private modalController: ModalController,
    private storage: Storage,
    public translateService: TranslateService) {
    addIcons ({ checkmarkSharp, close });
  }

  ngOnInit() {
    for (let key of this.columns) {
      this.object[key] = this.selected.indexOf(key) != -1;
    }
    console.log("Object:" + this.object);
  }

  closeWindow() {
    this.modalController.dismiss();
  }
  onSubmit() {
    console.log(this.object);
    var myArray: string[] = [];
    for (let key of this.columns) {
      if (this.object[key]) {
        myArray.push(key);
      }
    }
    console.log(myArray);
    this.storage.set(this.objectPath, JSON.stringify(myArray));
    this.modalController.dismiss(myArray);
  }
}
