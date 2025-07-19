
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
    'cephalixInstituteId',
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