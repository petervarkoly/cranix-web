import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
//own modules
import { ChallengesService } from 'cranix-common/dist/services/challenges.service';
import { AuthenticationService } from 'cranix-common/dist/services/auth.service';

@Component({
  selector: 'cranix-lessons',
  templateUrl: './lessons.page.html',
})
export class LessonsPage{

    constructor(
      public translateService: TranslateService,
      public challengesService: ChallengesService,
      public authS: AuthenticationService
    ){
      console.log(authS.isAllowed('challenge.manage'))
    }
    cleanUp(){
      console.log("cleanUp called")
      this.challengesService.modified = false;
    }
}