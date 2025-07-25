import { Component } from '@angular/core';
import { OutgoingRule } from 'src/app/shared/models/secutiry-model';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { ModalController } from '@ionic/angular';
import { SecurityService } from 'src/app/services/security-service';

class SourceObject {
  public key:  number;
  public name: string;
}
@Component({
  standalone: false,
    selector: 'cranix-add-outgoing-rule',
  templateUrl: './add-outgoing-rule.component.html',
  styleUrls: ['./add-outgoing-rule.component.scss'],
})
export class AddOutgoingRuleComponent {

  rule: OutgoingRule = new OutgoingRule();
  selectedSource;
  constructor(
    public objectService: GenericObjectService,
    public securityService: SecurityService,
    public modalCtrl: ModalController
  ) {
  }

  addOutRule() {
    console.log(this.selectedSource, this.rule);
    this.securityService.addOutgoingRule({
        protocol: this.rule.protocol,
        port: this.rule.port,
        name: this.selectedSource.name,
        id: this.selectedSource.id,
        type: this.rule.type,
        dest: this.rule.dest
      });
      
    this.modalCtrl.dismiss('success');
  }
}
