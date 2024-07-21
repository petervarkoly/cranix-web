import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular/standalone';
//Own stuff
import { UsersImport } from 'src/app/shared/models/data-model';

@Component({
  selector: 'cranix-show-import',
  imports: [ IonButtons, IonButton, IonIcon ],
  templateUrl: './show-import.component.html',
  styleUrls: ['./show-import.component.scss'],
})
export class ShowImportComponent implements OnInit {

  
  @Input() import: UsersImport;
  constructor(
    public alertController: AlertController,
    private modalController: ModalController,
    public translateService: TranslateService
  ) {
    addIcons ({ close });
  }

  ngOnInit() {}

  closeWindow(){
    this.modalController.dismiss();;
  }
}
