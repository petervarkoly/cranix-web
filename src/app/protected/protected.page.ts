import { addIcons } from 'ionicons';
import { informationCircleOutline, albums, business, pricetag, people, person, fileTrayStacked, desktop, save, settings, key, school, man, library } from 'ionicons/icons';
import { IonSplitPane, IonMenu, IonList, IonListHeader, IonItem, IonMenuToggle, IonIcon, IonFooter, IonButton, IonRouterOutlet } from '@ionic/angular/standalone';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/services/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'cranix-menue',
    imports: [ TranslateModule, RouterLink, RouterLinkActive, IonSplitPane, IonMenu, IonList, IonListHeader, IonItem, IonMenuToggle, IonIcon, IonFooter, IonButton, IonRouterOutlet ],
    templateUrl: './protected.page.html',
    styleUrls: ['./protected.page.scss'],
    standalone: true,
})
export class ProtectedPage implements OnInit {
  public appPages = [];
  private defAppPages = [
    {
      title: 'Customers',
      url: '/protected/cephalix/customers',
      icon: 'albums'
    },
    {
      title: 'Institutes',
      url: '/protected/cephalix/institutes',
      icon: 'business'
    },
    {
      title: 'Tickets',
      url: '/protected/cephalix/tickets',
      icon: 'pricetags'
    },
    {
      title: 'Groups',
      url: '/protected/cranix/groups',
      icon: 'people'
    },
    {
      title: 'Users',
      url: '/protected/cranix/users',
      icon: 'person'
    },
    {
      title: 'HWConfs',
      url: '/protected/cranix/hwconfs',
      icon: 'file-tray-stacked'
    },
    {
      title: 'Rooms',
      url: '/protected/cranix/rooms',
      icon: 'business'
    },
    {
      title: 'Devices',
      url: '/protected/cranix/devices',
      icon: 'desktop'
    },
    {
      title: 'Softwares',
      url: '/protected/cranix/softwares',
      icon: 'save'
    },
    {
      title: 'System',
      url: '/protected/cranix/system',
      icon: 'settings'
    },
    {
      title: 'Security',
      url: '/protected/cranix/security',
      icon: 'key'
    },
    {
      title: 'Lessons',
      url: '/protected/edu/lessons',
      icon: 'school'
    },
    {
      title: 'Profile',
      url: '/protected/cranix/profile',
      icon: 'man'
    },
    {
      title: 'MyGroups',
      url: '/protected/cranix/mygroups',
      icon: "people"
    },
    {
      title: "Informations",
      url: '/protected/cranix/informations',
      icon: 'library'
    }
  ];

  public disabled: boolean = false;

  constructor(
    public location: Location,
    public authService: AuthenticationService
  ) {
    addIcons ({ informationCircleOutline, albums, business, pricetag, people, person, fileTrayStacked, desktop, save, settings, key, school, man, library });
  }
  ngOnInit() {
    console.log(this.location.path())
    for (let page of this.defAppPages) {
      if (this.authService.isRouteAllowed(page.url)) {
        if (page.title == 'Lessons') {
          if (this.authService.isAllowed('challenge.manage')) {
            page.url = "/protected/edu/lessons/challenges"
          } else {
            page.url = "/protected/edu/lessons/tests"
          }
        }
        this.appPages.push(page);
      }
    }
  }
}
