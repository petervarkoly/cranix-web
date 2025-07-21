
export const simpleToolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }]
    ['link'],
];

export const mathToolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['link', 'image']
];

/**
   * The base objects which need to be loaded by the initialisations
   */
export const objectsTemlate: string[] = [
    'education/user',
    'education/group',
    'education/guestUser',
    'user',
    'group',
    'room',
    'device',
    'hwconf',
    'printer',
    'adhocroom',
    'challenge',
    'challenges/todo'
]

export const selects: any = {
    'action': ['wol', 'reboot', 'shutdown', 'logout'],
    'agGridThema': ['ag-theme-material', 'ag-theme-alpine', 'ag-theme-balham'],
    'devCount': [0, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096],
    'identifier': ['sn-gn-bd', 'uuid', 'uid'],
    'labelPlacement': ['fixed', 'floating', 'stacked', undefined],
    'lang': ['DE', 'EN'],
    'status': ['N', 'A', 'D'],
    'supporttype': ['Error', 'FeatureRequest', 'Feedback', 'ProductOrder']
}
export const enumerates: string[] = [
    'instituteType', 'groupType', 'deviceType', 'roomType', 'roomControl', 'network', 'accessType', 'role', 'noticeType'
];

export const multivalued: string[] = [
    'softwareVersions', 'softwareFullNames', 'mailAliases'
]

/**
 * Attributes which can not be modified
 */
export const readOnlyAttributes: string[] = [
    'id',
    'accessType',
    'classes',
    'counter',
    'devCount',
    'fsQuotaUsed',
    'ip',
    'ignoreNetbios',
    'loggedInName',
    'msQuotaUsed',
    'modified',
    'name',
    'network',
    'netMask',
    'creatorName',
    'created',
    'role',
    'roomId',
    'sourceAvailable',
    'startIP',
    'uid',
    'wlanIp'
]
/**
 * Attributes which we get but need not be shown
 */
export const hiddenAttributes: string[] = [
    'accessInRooms',
    'cephalixInstituteId',
    'color',
    'deleted',
    'devices',
    'fullName',
    'loggedInId',
    'network',
    'creatorId',
    'partitions',
    'saveNext',
    'screenShot',
    'users'
]
/**
 * Required attributes
 */
export const required: any = {
    'givenName': '*',
    'groupType': '*',
    'identifier': "*",
    'instituteType': '*',
    'importFile': "*",
    'name': '*',
    'regCode': '*',
    'role': '*',
    'surName': '*'
};


export const objectKeys = {
    'education/user': [],
    'education/group': [],
    'education/guestUser': [],
    'user': [],
    'group': [],
    'room': [],
    'device': [],
    'hwconf': [],
    'printer': [],
    'adhocroom': [],
    'challenge': [],
    'challenges/todo': []
}

export const hiddenColumns: string[] = [
    'adminPW',
    'cephalixPW',
    'childIds',
    'classIds',
    'creatorId',
    'id',
    'mustChange',
    'parentIds',
    'password',
    'accessInRooms',
    'cranixUserId',
    'cranixDeviceId',
    'color',
    'deleted',
    'devices',
    'fullName',
    'internalNetwork',
    'serverNetwork',
    'anonDhcpNetwork',
    'firstRoom',
    'ipAdmin',
    'ipFileserver',
    'ipPrint',
    'ipMail',
    'ipProxy',
    'ipBackup',
    'ipGateway',
    'ipTrNet',
    'gwTrNet',
    'nmTrNet',
    'loggedInId',
    'network',
    'creatorId',
    'screenShot',
    'fatClient',
    'partitions',
    'saveNext',
    'screenShot',
    'users'
]

import { AccessInRooms, AccessStatus, AdHocRoom, Announcenement, Category, Contact, CrxCalendar, CrxChallenge, CrxChallengeAnswer, CrxConfig, CrxNotice, CrxQuestion, CrxQuestionAnswer, CrxTicket, CrxTicketArticle, Device, DNSRecord, Drivers, EduRoom, FAQ, Group, GuestUsers, Hwconf, IdRequest, Installation, InstallStateDev, License, Package, Parent, ParentRequest, ParentTeacherMeeting, Partition, Permission, PositivList, Printer, PTMEvent, PTMTeacherInRoom, RecRule, RepoSoftware, Room, Software, SoftwareFullName, SoftwareStatus, SoftwareVersion, SubjectArea, SupportRequest, SystemConfig, TaskResponse, TeachingSubject, User, UsersImport } from './data-model'
import { Article, CephalixCare, Customer, DynDns, Institute, InstituteStatus, Notice, Repository, Ticket} from './cephalix-data-model'
export function getObjectKeys(objectType: string) {
    switch (objectType) {
        case 'accessinrooms': return Object.getOwnPropertyNames(new AccessInRooms)
        case 'accessstatus': return Object.getOwnPropertyNames(new AccessStatus)
        case 'adhocroom': return Object.getOwnPropertyNames(new AdHocRoom)
        case 'announcenement': return Object.getOwnPropertyNames(new Announcenement)
        case 'category': return Object.getOwnPropertyNames(new Category)
        case 'contact': return Object.getOwnPropertyNames(new Contact)
        case 'crxcalendar': return Object.getOwnPropertyNames(new CrxCalendar)
        case 'crxchallenge': return Object.getOwnPropertyNames(new CrxChallenge)
        case 'crxchallengeanswer': return Object.getOwnPropertyNames(new CrxChallengeAnswer)
        case 'crxconfig': return Object.getOwnPropertyNames(new CrxConfig)
        case 'crxnotice': return Object.getOwnPropertyNames(new CrxNotice)
        case 'crxquestion': return Object.getOwnPropertyNames(new CrxQuestion)
        case 'crxquestionanswer': return Object.getOwnPropertyNames(new CrxQuestionAnswer)
        case 'crxticket': return Object.getOwnPropertyNames(new CrxTicket)
        case 'crxticketarticle': return Object.getOwnPropertyNames(new CrxTicketArticle)
        case 'device': return Object.getOwnPropertyNames(new Device)
        case 'dnsrecord': return Object.getOwnPropertyNames(new DNSRecord)
        case 'drivers': return Object.getOwnPropertyNames(new Drivers)
        case 'eduroom': return Object.getOwnPropertyNames(new EduRoom)
        case 'faq': return Object.getOwnPropertyNames(new FAQ)
        case 'group': return Object.getOwnPropertyNames(new Group)
        case 'guestusers': return Object.getOwnPropertyNames(new GuestUsers)
        case 'hwconf': return Object.getOwnPropertyNames(new Hwconf)
        case 'idrequest': return Object.getOwnPropertyNames(new IdRequest)
        case 'installation': return Object.getOwnPropertyNames(new Installation)
        case 'installstatedev': return Object.getOwnPropertyNames(new InstallStateDev)
        case 'license': return Object.getOwnPropertyNames(new License)
        case 'package': return Object.getOwnPropertyNames(new Package)
        case 'parent': return Object.getOwnPropertyNames(new Parent)
        case 'parentrequest': return Object.getOwnPropertyNames(new ParentRequest)
        case 'parentteachermeeting': return Object.getOwnPropertyNames(new ParentTeacherMeeting)
        case 'partition': return Object.getOwnPropertyNames(new Partition)
        case 'permission': return Object.getOwnPropertyNames(new Permission)
        case 'positivlist': return Object.getOwnPropertyNames(new PositivList)
        case 'printer': return Object.getOwnPropertyNames(new Printer)
        case 'ptmevent': return Object.getOwnPropertyNames(new PTMEvent)
        case 'ptmteacherinroom': return Object.getOwnPropertyNames(new PTMTeacherInRoom)
        case 'recrule': return Object.getOwnPropertyNames(new RecRule)
        case 'reposoftware': return Object.getOwnPropertyNames(new RepoSoftware)
        case 'room': return Object.getOwnPropertyNames(new Room)
        case 'software': return Object.getOwnPropertyNames(new Software)
        case 'softwarefullname': return Object.getOwnPropertyNames(new SoftwareFullName)
        case 'softwarestatus': return Object.getOwnPropertyNames(new SoftwareStatus)
        case 'softwareversion': return Object.getOwnPropertyNames(new SoftwareVersion)
        case 'subjectarea': return Object.getOwnPropertyNames(new SubjectArea)
        case 'supportrequest': return Object.getOwnPropertyNames(new SupportRequest)
        case 'systemconfig': return Object.getOwnPropertyNames(new SystemConfig)
        case 'taskresponse': return Object.getOwnPropertyNames(new TaskResponse)
        case 'teachingsubject': return Object.getOwnPropertyNames(new TeachingSubject)
        case 'user': return Object.getOwnPropertyNames(new User)
        case 'usersimport': return Object.getOwnPropertyNames(new UsersImport)
        case 'article': return Object.getOwnPropertyNames(new Article)
        case 'cephalixcare': return Object.getOwnPropertyNames(new CephalixCare)
        case 'customer': return Object.getOwnPropertyNames(new Customer)
        case 'dyndns': return Object.getOwnPropertyNames(new DynDns)
        case 'institute': return Object.getOwnPropertyNames(new Institute)
        case 'institutestatus': return Object.getOwnPropertyNames(new InstituteStatus)
        case 'notice': return Object.getOwnPropertyNames(new Notice)
        case 'repository': return Object.getOwnPropertyNames(new Repository)
        case 'ticket': return Object.getOwnPropertyNames(new Ticket)
    }
}