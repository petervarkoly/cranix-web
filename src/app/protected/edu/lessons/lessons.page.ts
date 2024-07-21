import { addIcons } from 'ionicons';
import { list, room, calendar } from 'ionicons/icons';
import { IonTabs, IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { Component, OnInit} from '@angular/core';
//own modules
import { ChallengesService } from 'src/app/services/challenges.service';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
    selector: 'cranix-lessons',
  imports: [ IonTabs, IonTabBar, IonTabButton, IonIcon ],
    templateUrl: './lessons.page.html',
    standalone: true,
})

export class LessonsPage implements OnInit {

    constructor(
      public challengesService: ChallengesService,
      public authS: AuthenticationService
    ){
    addIcons ({ list, room, calendar });}

    ngOnInit(){
    }

    cleanUp(){
      console.log("cleanUp called")
      this.challengesService.modified = false;
    }
}
