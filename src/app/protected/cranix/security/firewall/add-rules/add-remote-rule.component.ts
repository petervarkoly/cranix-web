import { IonHeader, IonButtons, IonButton, IonIcon, IonContent, IonList, IonLabel, IonInput } from '@ionic/angular/standalone';
import { Component, OnInit } from '@angular/core';
import { RemoteRule } from 'src/app/shared/models/secutiry-model';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { ModalController } from '@ionic/angular/standalone';
import { SecurityService } from 'src/app/services/security-service';

@Component({
    selector: 'cranix-add-remote-rule',
  imports: [ IonHeader, IonButtons, IonButton, IonIcon, IonContent, IonList, IonLabel, IonInput ],
    templateUrl: './add-remote-rule.component.html',
    styleUrls: ['./add-remote-rule.component.scss'],
    standalone: true,
})
export class AddRemoteRuleComponent implements OnInit {

  rule: RemoteRule = new RemoteRule();
  deviceIps: any[] = [];
  selectedDevice: any;
  constructor(
    public objectService: GenericObjectService,
    public securityService: SecurityService,
    public modalCtrl: ModalController
  ) {
    for (let dev of this.objectService.allObjects['device']) {
      this.deviceIps.push({ key: dev.id, name: dev.name })
    }
  }

  ruleTypeChanged() { }
  ngOnInit() { }

  addRemoteRule(rule) {
    console.log(rule);
    this.securityService.addRemoteRule({
        ext:  rule.ext,
        id:   this.selectedDevice.key,
        name: this.selectedDevice.name,
        port: rule.port
      });
    this.modalCtrl.dismiss('success');
  }
}
