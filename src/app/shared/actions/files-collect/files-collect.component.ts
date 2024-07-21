import { addIcons } from 'ionicons';
import { checkmarkSharp, close } from 'ionicons/icons';
import { IonHeader, IonButtons, IonButton, IonIcon, IonContent, IonLabel, IonInput, IonCheckbox, IonItem } from '@ionic/angular/standalone';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { CrxActionMap } from '../../models/server-models';
import { EductaionService } from 'src/app/services/education.service';

@Component({
  selector: 'cranix-files-collect',
  imports: [ IonHeader, IonButtons, IonButton, IonIcon, IonContent, IonLabel, IonInput, IonCheckbox, IonItem ],
  templateUrl: './files-collect.component.html',
  styleUrls: ['./files-collect.component.scss'],
})
export class FilesCollectComponent implements OnInit {

  projectName: string = "";
  sortInDirs: boolean = true;
  studentsOnly: boolean = true;
  cleanUpExport: boolean = true;

  @Input() actionMap: CrxActionMap;
  @Input() objectType: string;
  constructor(
    public educationController: EductaionService,
    public modalController: ModalController
  ) {
    addIcons ({ checkmarkSharp, close });
  }

  ngOnInit() {
    this.objectType = this.objectType.replace("education/", "");
   }

  onSubmit() {
      let fd = new FormData();
      fd.append('projectName', this.projectName);
      fd.append('objectIds', this.actionMap.objectIds.join(","));
      fd.append('studentsOnly', this.studentsOnly ? "true" : "false");
      fd.append('sortInDirs', this.sortInDirs ? "true" : "false");
      fd.append('cleanUpExport', this.cleanUpExport ? "true" : "false");
      this.educationController.collectDataFromObjects(fd, this.objectType);
      this.modalController.dismiss();
    }
}
