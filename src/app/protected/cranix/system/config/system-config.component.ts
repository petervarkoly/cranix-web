import { Component, OnInit } from '@angular/core';


import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService} from 'src/app/services/language.service';
import { SystemConfig } from 'src/app/shared/models/data-model';
import { SystemService } from 'src/app/services/system.service';
import { AuthenticationService } from 'src/app/services/auth.service';
@Component({
  standalone: false,
    selector: 'cranix-system-config',
  templateUrl: './system-config.component.html',
  styleUrls: ['./system-config.component.scss'],
})
export class SystemConfigComponent implements OnInit {

  configs: SystemConfig[] = [];
  toShow = "Basic";
  editingConfig: boolean=false;
  config: SystemConfig;
  constructor(
    public authService: AuthenticationService,
    public objectService: GenericObjectService,
    public languageService: LanguageService,
    public systemService: SystemService
  ) { }

  ngOnInit() {
    let sub = this.systemService.getSystemConfiguration().subscribe(
    (val) => {
      val.sort((a, b) => (a.key > b.key) ? 1 : (b.key > a.key) ? -1 : 0)
      this.configs = val },
      (err) => { console.log(err) },
      () => { sub.unsubscribe() }
    )
  }

  segmentChanged(event) {
      this.toShow = event.detail.value;
  }

  save(key: string){
    let sub = this.systemService.setSystemConfigValue(key,(<HTMLInputElement>document.getElementById(key)).value).subscribe(
      (val) => {
        this.objectService.responseMessage(val)
        if( val.code == "OK" ) {
          this.ngOnInit();
          this.editingConfig = false;
        }
      },
      (err) => {
        this.objectService.errorMessage(err);
      },
      ()=> {sub.unsubscribe()}
    )
  }

  togle(key: string, event){
    let checked = event.detail.checked
    let sub = this.systemService.setSystemConfigValue(key, checked ? "yes" : "no").subscribe(
      (val) => {
        this.objectService.responseMessage(val);
        if( val.code == "OK" ) {
          this.ngOnInit();
          this.editingConfig = false;
        }
      },
      (err) => {
        this.objectService.errorMessage(err);
      },
      ()=> {
        sub.unsubscribe()
      }
    )
  }

  editConfig(config: SystemConfig){
    this.config = config;
    this.editingConfig = true;
  }
}
