
export class Customer {
    id?: number = 0;
    name: string = '';
    name2: string = '';
    uuid: string = '';
    description: string = '';
    category: string = '';
    address1: string = '';
    address2: string = '';
    postalCode: string = '';
    state: string = '';
    locality: string = '';
    country: string = '';
    contact: string = '';
    telephone: string = '';
    created: any = new Date();
    modified: any = new Date();
    constructor() {}
}

export class Institute {
    id?: number = 0;
    name: string = '';
    uuid: string = '';
    instituteType: string = '';
    locality: string = '';
    regCode: string = '';
    validity: any = new Date();
    domain: string = '';
    ayTemplate: string = '';
    internalNetwork: string = '';
    ipVPN: string = '';
    serverNetwork: string = '';
    anonDhcpNetwork: string = '';
    firstRoom: string = '';
    ipAdmin: string = '';
    ipFileserver?: string = '';
    ipPrint: string = '';
    ipMail: string = '';
    ipProxy: string = '';
    ipBackup: string = '';
    ipGateway: string = '';
    ipTrNet: string = '';
    gwTrNet: string = '';
    nmTrNet: string = '';
    deleted;
    adminPW: string = '';
    cephalixPW: string = '';
    created: any = new Date();
    modified: any = new Date();
    cephalixCustomerId: number;
    constructor() {}
}

export class Ticket {
    id?: number = 0;
    title: string = "";
    ticketStatus: string = "";
    modified: any = new Date();
    created: any = new Date();
    cephalixInstituteId: number = 0;
    cephalixCustomerId: number = 0;
    cranixUserId: number = 0;
    cranixDeviceId: number = 0;
    creatorId: number = 0;
    ticketType: string = "";
    firstname: string = "";
    lastname: string = "";
    email: string = "";
    priority: number = 0;
    constructor() {}
}

export class Article {
    id?: number;
    cephalixTicketId: number = 0;
    title: string = "";
    sender: string = "";
    recipient: string = "";
    articleType: string = "";
    seen: boolean = false;
    text: string = "";
    created: any = new Date();
    modified: any = new Date();
    reminder: any = new Date();
    workTime: number = 0;
    pictures: any[] = [];
    attachment?: any = "";
    attachmentName?: string = "";
    constructor() {}
}
export class InstituteStatus {
    id?: number;
    cephalixInstituteId: number = 0;
    errorMessages?: string = "";
    rootUsage: string ="";
    srvUsage: string = "";
    varUsage: string ="";
    homeUsage: string = "";
    runningKernel: string ="";
    installedKernel: string ="";
    availableUpdates: string = "";
    lastUpdate: any =new Date();
    version: string ="";
    created: any = new Date();
    modified: any = new Date();
    uptime: string ="";
    constructor() {}
}
export class Repository {
    id?: number;
    name: string = "";
    repositoryType: string = "";
    description: string = "";
    repository: string = "";
    constructor() {}
}

export class CephalixCare {
    id?: number;
    cephalixInstituteId: number = 0;
    description: string = "";
    access: string = "";
    contact: string = "";
    constructor() {}
}

export class DynDns {
    id?: number;
    cephalixInstituteId: number = 0;
    hostname: string = "";
    domain: string = "cephalix.eu";
    ip: string = "";
    port: string = "22";
    ro: boolean = false;
    ts: any = new Date();
    constructor() {}
}

export class Notice {
    id?: number;
    title:       string = "";
    noticeType:  string = "";
    text:        string = "";
    created:     any    = new Date();
    reminder:    any    = new Date();
    workTime:    number = 0;
    invoiced:    boolean= false;
    cephalixInstituteId: number = 0;
    constructor() {}
}

export interface CopyFile {
    instituteIds: number [],
    directory: string,
    mode: string,
    execute: boolean,
    file: File
}

export interface SynchronizedObject {
    id?: number,
    instituteId: number,
    objectType: string,
    objectName: number,
    cephalixId: number,
    cranixId: number,
    lastSync: number,
    syncRunning: boolean
}

export const contracts = [
    "CRANIX Base",
    "CRANIX Extended",
    "CRANIX Plus",
    "CRANIX Mail",
    "CEPHALIX",
    "Customized",
    "Private"
]
