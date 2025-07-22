import { Component } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';


//own modules
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { Ticket } from 'src/app/shared/models/cephalix-data-model'
import { AuthenticationService } from 'src/app/services/auth.service';
import { CephalixService } from 'src/app/services/cephalix.service';
import { SupportRequest } from 'src/app/shared/models/data-model';
import { CreateSupport } from 'src/app/shared/actions/create-support/create-support-page';

@Component({
  standalone: false,
  selector: 'cranix-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage {
  context;
  alive: boolean;
  supportRequest: SupportRequest

  constructor(
    public authService: AuthenticationService,
    public cephalixService: CephalixService,
    public objectService: GenericObjectService,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public languageS: LanguageService,
    private route: Router,
    private storage: Storage
  ) {

    this.context = { componentParent: this };

  }

  ngOnDestroy() {
    this.alive = false;
  }
  async redirectToEdit(ticket: Ticket) {
    if (ticket) {
      this.route.navigate(['/pages/cephalix/tickets/' + ticket.id]);
    } else {
      var mySupport = new SupportRequest();
      mySupport.lastname = this.authService.session.fullName.replace("(", "").replace(")", "")
      const modal = await this.modalCtrl.create({
        component: CreateSupport,
        cssClass: 'big-modal',
        componentProps: {
          support: mySupport,
        },
        animated: true,
        showBackdrop: true
      });
      (await modal).present().then(
        (val) => this.objectService.getAllObject('ticekt')
      );
    }
  }
}
