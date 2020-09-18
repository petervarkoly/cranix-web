import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpClientModule } from '@angular/common/http';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { CanDeactivate } from '@angular/router';

//Own Stuff
import { UtilsService } from './utils.service';
import { AuthenticationService } from './auth.service';
import { GenericObjectService } from './generic-object.service';
import { LanguageService } from './language.service';
import { ServerResponse } from 'src/app/shared/models/server-models';
import { AccessInRoom, IncomingRules, OutgoingRule, RemoteRule } from '../shared/models/secutiry-model';
import { Room } from '../shared/models/data-model';

@Injectable()
export class SecurityService {

  headers: HttpHeaders;
  textHeaders: HttpHeaders;
  hostname: string;
  token: string;
  url: string;
  incomingRules: IncomingRules;
  outgoingRules: OutgoingRule[];
  remoteRules: RemoteRule[];
  firewallRooms: Room[];
  public outgoinChanged: boolean = false;
  public incomingChanged: boolean = false;
  public remoteChanged: boolean = false;
  public proxyChanged = {
    good: false,
    bad: false,
    cephalix: false
  }

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient,
    public languageS: LanguageService,
    public modalCtrl: ModalController,
    public objectService: GenericObjectService,
    public toastController: ToastController,
    private utilsS: UtilsService
  ) {
    this.hostname = this.utilsS.hostName();
    this.token = this.authService.getToken();
    this.headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Accept': "application/json",
      'Authorization': "Bearer " + this.token
    });
    this.textHeaders = new HttpHeaders({
      'Accept': "text/plain",
      'Authorization': "Bearer " + this.token
    });
  }

  getAllAccess() {
    this.url = this.hostname + `/rooms/accessList`;
    console.log(this.url);
    return this.http.get<AccessInRoom[]>(this.url, { headers: this.headers });
  }

  getProxyBasic() {
    this.url = this.hostname + `/system/proxy/basic`;
    console.log(this.url);
    return this.http.get<any[]>(this.url, { headers: this.headers });
  }

  setProxyBasic(acls) {
    this.url = this.hostname + `/system/proxy/basic`;
    console.log(this.url);
    return this.http.post<ServerResponse>(this.url, acls, { headers: this.headers });
  }

  getProxyCustom(custom) {
    this.url = this.hostname + `/system/proxy/custom/${custom}`;
    console.log(this.url);
    return this.http.get<string[]>(this.url, { headers: this.headers });
  }

  setProxyCustom(custom,list: string[]) {
    this.url = this.hostname + `/system/proxy/custom/${custom}`;
    console.log(this.url);
    return this.http.post<ServerResponse>(this.url, list, { headers: this.headers });
  }

  getIncomingRules() {
    this.url = this.hostname + `/system/firewall/incomingRules`;
    console.log(this.url);
    return this.http.get<IncomingRules>(this.url, { headers: this.headers });
  }

  getOutgoingRules() {
    this.url = this.hostname + `/system/firewall/outgoingRules`;
    console.log(this.url);
    return this.http.get<OutgoingRule[]>(this.url, { headers: this.headers });
  }

  getRemoteRules() {
    this.url = this.hostname + `/system/firewall/remoteAccessRules`;
    console.log(this.url);
    return this.http.get<RemoteRule[]>(this.url, { headers: this.headers });
  }

  getFirewallRooms() {
    this.url = this.hostname + "/rooms/allWithFirewallControl";
    console.log(this.url);
    return this.http.get<Room[]>(this.url, { headers: this.headers });
  }

  async applyChange(rules, rulesName) {
    this.url = this.hostname + '/system/firewall/' + rulesName;
    let sub = this.http.post<ServerResponse>(this.url, rules, { headers: this.headers }).subscribe(
      (val) => {
        this.objectService.responseMessage(val);
      },
      (err) => {
        this.objectService.errorMessage(this.languageS.trans("An error was accoured"));
      },
      () => { sub.unsubscribe() }
    );
  }

  addAccessInRoom(accessInRoom: AccessInRoom) {
    this.url = this.hostname + "/rooms/" + accessInRoom.roomId + "/accessList";
    console.log(this.url);
    this.objectService.requestSent();
    let sub = this.http.post<ServerResponse>(this.url, accessInRoom, { headers: this.headers }).subscribe(
      (val) => {
        this.objectService.responseMessage(val);
      },
      (err) => {
        this.objectService.errorMessage(this.languageS.trans("An error was accoured"));
      },
      () => { sub.unsubscribe() }
    );
  }

  deleteAccessInRoom(id: number) {
    this.url = this.hostname + "/rooms/accessList/" + id;
    console.log(this.url);
    this.objectService.requestSent();
    let sub = this.http.delete<ServerResponse>(this.url, { headers: this.headers }).subscribe(
      (val) => {
        this.objectService.responseMessage(val);
      },
      (err) => {
        this.objectService.errorMessage(this.languageS.trans("An error was accoured"));
      },
      () => { sub.unsubscribe() }
    );
  }

  readDatas() {
    let sub1 = this.getIncomingRules().subscribe(
      (val) => { this.incomingRules = val; },
      (err) => { console.log(err) },
      () => { sub1.unsubscribe(); }
    );
    let sub2 = this.getOutgoingRules().subscribe(
      (val) => { this.outgoingRules = val; },
      (err) => { console.log(err) },
      () => { sub2.unsubscribe(); }
    );
    let sub3 = this.getRemoteRules().subscribe(
      (val) => { this.remoteRules = val; },
      (err) => { console.log(err) },
      () => { sub3.unsubscribe(); }
    )
    let sub4 = this.getFirewallRooms().subscribe(
      (val) => { this.firewallRooms = val; },
      (err) => { console.log(err) },
      () => { sub4.unsubscribe(); }
    )
  }
}

@Injectable()
export class FirewallCanDeactivate implements CanDeactivate<SecurityService> {
  constructor(
    public languageS: LanguageService,
    public securityService: SecurityService
  ) { }
  canDeactivate(securityService: SecurityService) {
    if (this.securityService.outgoinChanged) {
      return window.confirm(
        this.languageS.trans('The outgoing rules was changed but not saved.') +
        this.languageS.trans('The changes will be lost if you leave the module.')
      );
    }
    if (this.securityService.remoteChanged) {
      return window.confirm(
        this.languageS.trans('The remote rules was changed but not saved.') +
        this.languageS.trans('The changes will be lost if you leave the module.')
      );
    }
    if (this.securityService.incomingChanged) {
      return window.confirm(
        this.languageS.trans('The incomming rules was changed but not saved.') +
        this.languageS.trans('The changes will be lost if you leave the module.')
      );
    }
    return true;
  }
}

@Injectable()
export class ProxyCanDeactivate implements CanDeactivate<SecurityService> {
  constructor(
    public languageS: LanguageService,
    public securityService: SecurityService
  ) { }
  canDeactivate(securityService: SecurityService) {
    if (this.securityService.proxyChanged['good']) {
      return window.confirm(
        this.languageS.trans('The white list was changed.') +
        this.languageS.trans('The changes will be lost if you leave the module.')
      );
    }
    if (this.securityService.proxyChanged['bad']) {
      return window.confirm(
        this.languageS.trans('The black list was changed.') +
        this.languageS.trans('The changes will be lost if you leave the module.')
      );
    }
    if (this.securityService.proxyChanged['cephalix']) {
      return window.confirm(
        this.languageS.trans('The chephalix list  was changed.') +
        this.languageS.trans('The changes will be lost if you leave the module.')
      );
    }
    return true;
  }
}