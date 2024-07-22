import { addIcons } from 'ionicons';
import { caretBack, statsChart, codeWorking, peopleOutline } from 'ionicons/icons';
import { IonTabBar, IonTabs, IonTabButton, IonIcon, IonNav } from '@ionic/angular/standalone';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/auth.service';
import { InstitutesComponent } from './institutes.component'
import { InstitutesStatusComponent } from './institutes-status.component'
import { InstitutesSyncObjectsComponent } from './institutes-sync-objects.component'; 
import { InstitutesManage } from './institutes.manage'; 

@Component({
    selector: 'cranix-institutes-lists',
    imports: [ TranslateModule, IonTabBar, IonTabButton, IonTabs, IonIcon, IonNav, InstitutesComponent, InstitutesStatusComponent, InstitutesSyncObjectsComponent, InstitutesManage ],
    templateUrl: './institutes-lists.page.html',
    standalone: true
})
export class InstitutesListsPage {
  constructor(
    public translateService: TranslateService,
    public authService: AuthenticationService
  ) {
    addIcons ({ caretBack, statsChart, codeWorking, peopleOutline });
  }
}