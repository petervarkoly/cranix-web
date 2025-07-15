import { Component, OnInit } from '@angular/core';
import { OutgoingRule } from 'cranix-common';
import { GenericObjectService } from 'cranix-common';
import { ModalController } from '@ionic/angular';
import { SecurityService } from 'cranix-common';

class SourceObject {
  public key:  number;
  public name: string;
}
@Component({     standalone: false,
  selector: 'cranix-add-outgoing-rule',
  templateUrl: './add-outgoing-rule.component.html',
  styleUrls: ['./add-outgoing-rule.component.scss'],
})
export class AddOutgoingRuleComponent implements OnInit {

  rule: OutgoingRule = new OutgoingRule();
  roomIps:        SourceObject[] = [];
  deviceIps:      SourceObject[] = [];
  selectedSource: SourceObject;
  constructor(
    public objectService: GenericObjectService,
    public securityService: SecurityService,
    public modalCtrl: ModalController
  ) {
    for (let room of this.securityService.firewallRooms) {
      this.roomIps.push({ key: room.id, name: room.name })
    }
    for (let dev of this.objectService.allObjects['device']) {
      this.deviceIps.push({ key: dev.id, name: dev.name })
    }
  }

  ruleTypeChanged() { }
  ngOnInit() { }

  addOutRule(rule: OutgoingRule) {
    console.log(rule);
    console.log(this.selectedSource);
    rule.id= this.selectedSource.key;
    let name = this.selectedSource.name;
    this.securityService.addOutgoingRule({
        protocol: rule.protocol,
        port: rule.port,
        name: name,
        id: rule.id,
        type: rule.type,
        dest: rule.dest
      });
    this.modalCtrl.dismiss('success');
  }
}
