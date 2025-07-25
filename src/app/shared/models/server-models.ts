
/**
 * Thes session modell
 * @description The object recived if the login was succesfull.
 */
import { User } from "./data-model";

export interface Crx2fa {
        id?: number,
        creatorId?: number,
        crx2faType: string,
        crx2faAddress: string,
        serial?: string,
        timeStep: number,
        validHours: number
}

export class Crx2faSession {
        id: number = 0;
        creatorId: number = 0;
        created?: string = "";
        validHours: number = 2;
        valid: boolean
        token: string
}

/* export interface UserResponse {
  userId: number,
  token: string,
  mac: string,
  name: string,
  role: string,
  dnsName: string,
  roomId: string,
  roomName?: string,
  instituteName?: string,
  mustChange: boolean,
  mustSetup2fa?: boolean,
  fullName: string,
  acls: string[],
  crx2fas?: string[],
  crx2faSession?: Crx2faSession
}
*/
export class UserResponse {
        id: number;
        createDate: Date;
        validFrom?: Date;
        validUntil?: Date;
        userId: number;
        user?: User;
        crx2faSession?: Crx2faSession;
        ip: string;
        token: string;
        gotoPath?: string;
        role: string;
        password: string;
        mustChange: boolean;
        mac: string;
        dnsName: string;
        acls: string[];
        fullName: string;
        name: string;
        roomId: string;
        roomName?: string;
        instituteName?: string;
        mustSetup2fa?: boolean;
        crx2fas?: string[];
}

/**
 * The LoginForm intefrace 
 * @description variables used to login  
 */
export class LoginForm {
        username: string = "";
        password: string = "";
        crx2faSessionId?: string = "";
}

export interface ServerResponse {
        id: number,
        code: string,
        value: string,
        objectId: number,
        parameters: string[]

}

export class CrxActionMap {
        objectIds: number[] = [];
        booleanValue: boolean = true;
        longValue: number = 0;
        name: string = "";
        stringValue = "";
}

export class Settings {
        lang: string = "DE";
        errorMessageDuration: number = 10;
        okMessageDuration: number = 10;
        warningMessageDuration: number = 6;
        lineProPageMD: number = 15;
        agGridThema: string = "ag-theme-alpine";
        rowHeight: number = 35;
        rowMultiSelectWithClick: boolean = true;
        checkboxSelection: boolean = true;
        headerCheckboxSelection: boolean = true;
        labelPlacement: string = "fixed";
        debug: boolean = false;
        constructor() { }
}

export class Acl {
        id: number;
        acl: string = "";
        allowed: boolean = true;
        userId: number;
        groupId: number;
}

export class ServiceStatus {
        service: string;
        enabled: string;
        active: string;
}
export const TOKEN = 'cranix-token';

export class MailAccess {
        id: number = 0;
        creatorId?: number = 0;
        created?: string = "";
        modified?: string = "";
        address: string = "";
        action: string = "";
}

export class CrxTicketStatus {
        N: number = 0;
        R: number = 0;
        W: number = 0;
}

