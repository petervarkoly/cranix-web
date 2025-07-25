import { Frequency, RRule } from 'rrule';
export class Hwconf {
	id?: number = 0;
	name: string = "";
	deviceType: string = "";
	description: string = "";
	partitions?: Partition[]
	constructor() { }
}

export class Partition {
	id?: number;
	name: string = "";
	description: string = "";
	os: string = "";
	format: string = "";
	joinType: string = "";
	tool: string = "";
	lastCloned: number | string = "";
	constructor() { }
}

export class User {
	id?: number;
	uid?: string = "";
	uuid?: string = "";
	surName: string = "";
	givenName: string = "";
	birthDay?: string = "";
	password?: string = "";
	role?: string = "";
	mustChange?: boolean = true;
	classes?: string = "";
	msQuota?: number = 0;
	fsQuota?: number = 0;
	msQuotaUsed?: number = 0;
	fsQuotaUsed?: number = 0;
	fullName: string = "";
	mailAliases: string[] = [];
	emailAddress?: string = ""
	telefonNumber?: string = ""
	childIds?: number[] = []
	parentIds?: number[] = []
	classIds?: number[] = []
	otp?: string
	constructor() { }
}
export class UsersImport {
	startTime: string;
	role: string = "";
	lang: string = "";
	identifier: string = "";
	test: boolean = true;
	password: string = "";
	mustChange: boolean = false;
	full: boolean = false;
	allClasses: boolean = false;
	cleanClassDirs: boolean = false;
	resetPassword: boolean = false;
	appendBirthdayToPassword: boolean = false;
	appendClassToPassword: boolean = false;
	result?: any = null;
	importFile: any;
	constructor() { }
}

export class AccessInRooms {
	id?: number;
	accessType: string = "";
	action?: string = "";
	roomId: number = 0;
	monday?: boolean = false;
	tuesday?: boolean = false;
	wednesday?: boolean = false;
	thursday?: boolean = false;
	friday?: boolean = false;
	saturday?: boolean = false;
	sunday?: boolean = false;
	holiday?: boolean = false;
	direct: boolean = false;
	login: boolean = false;
	portal: boolean = false;
	printing: boolean = false;
	proxy: boolean = false;
	pointInTime?: string = "";
	constructor() { }
}

export class Room {
	id?: number;
	name: string = "";
	description: string = "";
	ignoreNetbios: boolean = false;
	hwconfId: number = 0;
	netMask?: number = 0;
	devCount?: number = 0;
	devices?: any;
	users?: User[];
	startIP?: string = "";
	roomType: string = "";
	roomControl: string = "";
	network: string;
	places: number = 0;
	rows: number = 0;
	accessInRooms?: AccessInRooms[] = [];
	constructor() { }
}

export class Group {
	id?: number = 0;
	name: string = "";
	description: string = "";
	groupType: string = "";
	constructor() { }
}

export class Package {
	name: string = "";
	version: string = "";
	weight: number = 0;
	constructor() { }
}
export class SoftwareVersion {
	id?: number;
	version: string = "";
	status?: string = "";
	constructor() { }
}

export class SoftwareFullName {
	id?: number;
	fullName: string = "";
}
export class Software {
	id?: number;
	name: string = "";
	description: string = "";
	weight: number = 0;
	version?: string = "";
	manually: boolean = false;
	sourceAvailable: boolean;
	softwareVersions: SoftwareVersion[];
	softwareFullNames: SoftwareFullName[];
	constructor() { }
}

export class SoftwareStatus {
	id: number = 0;
	status: string = "";
	softwareversionId?: number;
	deviceId?: number;
	roomName: string = "";
	deviceName: string = "";
	softwareName: string = "";
	manually: boolean;
	softwareId: number;
	version: string;
	constructor() { }
}

export class RepoSoftware {
	name: string = "";
	version: string = "";
	constructor() { }
}

export class InstallStateDev {
	softwareName: string = "";
	deviceName: string = "";
	softwareversionId: string = "";
	version: string = "";
	status: string = "";
	manually: boolean = false;
	constructor() { }
}

export class License {
	id?: number;
	softwareId: number = 0;
	licenseType: string = "";
	count: number = 0;
	value: string = "";
	file?: File = null;
	constructor() { }
}
export class Device {
	id?: number;
	name: string = "";
	place?: number = 0;
	row?: number = 0;
	ip: string = "";
	mac: string = "";
	wlanIp?: string = "";
	wlanMac?: string = "";
	serial?: string = "";
	inventary?: string = "";
	locality?: string = "";
	hwconfId: number = 0;
	roomId?: any = null;
	screenShot?;
	loggedInId?;
	loggedInName?;
	constructor() { }
}
export class Printer {
	id?: number;
	name: string = "";
	ip: string = "";
	deviceName: string = "";
	deviceId?: number;
	manufacturer: string = "";
	model: string = "";
	mac: string = "";
	roomId: number = 0;
	windowsDriver: boolean = false;
	state: string = "";
	acceptingJobs: boolean = false;
	activeJobs: number = 0;
	inventary: string = "";
	serial: string = "";
	driverFile: any = "";
	constructor() { }
}
export class Drivers {
	name: string = "";
	printers: String[] = [];
	constructor() { }
}
export class Installation {
	id?: number;
	name?: string = "";
	description?: string = "";
	categoryType?: string = "";
	deviceIds?: number[] = [];
	roomIds?: number[] = [];
	softwareIds?: number[] = [];
	hwonfIds?: number[]
	constructor() { }
}

export class Permission {
	id?: number;
	acl: string = "";
	allowed: boolean = false;
	userId?: number = 0;
	groupId?: number = 0;
	constructor() { }
}

export class AccessStatus {
	id?: number;
	accessType?: string = "";
	action?: string = "";
	roomId: any = null;
	monday?: boolean = false;
	tuesday?: boolean = false;
	wednesday?: boolean = false;
	thursday?: boolean = false;
	friday?: boolean = false;
	saturday?: boolean = false;
	sunday?: boolean = false;
	holiday?: boolean = false;
	direct: boolean = false;
	login: boolean = false;
	portal: boolean = false;
	printing: boolean = false;
	proxy: boolean = false;
	pointInTime?: string = "";
	constructor() { }
}

export class Announcenement {
	id?: number;
	issue: string = "";
	keywords: string = "";
	text: string = "";
	title: string = "";
	seenByMe: boolean = false;
	validFrom: any = new Date();
	validUntil: any = new Date();
	categories: Category[] = [];
	constructor() { }
}

export class TaskResponse {
	id?: number;
	parentId: number = 0;
	creatorId: number = 0;
	text: string = "";
	rating: string = "";
	title?: string = "";
	validFrom?: any;
	validUntil?: any;
}

export class FAQ {
	id?: number;
	abstract: string = "";
	issue: string = "";
	text: string = "";
	title: string = "";
	categories: Category[] = [];
	constructor() { }
}

export class Contact {
	id?: number;
	email: string = "";
	issue: string = "";
	name: string = "";
	phone: string = "";
	title: string = "";
	categories: Category[];
	constructor() { }
}

export class AdHocRoom extends Room {
	devicesProUser?: number = 1;
	devCount: number = 0;
	studentsOnly: boolean = false;
	groupIds: number[] = [];
	userIds?: number[] = [];
	users?: User[] = [];
	groups?: Group[] = [];
}

export class SupportRequest {
	firstname: string = "";
	lastname: string = "";
	email: string = "";
	supporttype: string = "Error";
	subject: string = "";
	description: string = "";
	text?: string = "";
	regcode: string = "";
	product: string = "";
	company: string = "";
	regcodeValidUntil?: number = 0;
	status?: string = "";
	requestDate?: number = 0;
	ticketno?: number = 0;
	ticketResponseInfo?: string = "";
	constructor() { }
}

export class DNSRecord {
	domainName: string = "";
	recordType: string = "";
	recordName: string = "";
	recordData: string = "";
	constructor() { }
}

export class GuestUsers {
	id?: number;
	name: string = "";
	description: string = "";
	count: number = 0;
	password: string = "";
	roomIds?: number[] = [];
	validUntil: any = new Date();
	privateGroup: boolean = false;
	createAdHocRoom: boolean = false;
	roomControl?: string = "";
	constructor() { }
}

export class Category {
	id?: number;
	description: string = "";
	name: string = "";
	categoryType: string = "";
	validFrom?: any = new Date();
	validUntil: any = new Date();
	creatorId?: number = 0;
	deviceIds?: number[] = [];
	roomIds?: number[] = [];
	userIds?: number[] = [];
	groupIds?: number[] = [];
	softwareIds?: number[] = [];
	announcementIds?: number[] = [];
	contactIds?: number[] = [];
	faqIds?: number[] = [];
	studentsOnly?: boolean = false;
	publicAccess?: boolean = false;
	hwconfIds?: number[] = [];
	faqids?: number[];
	constructor() { }
}

export class SystemConfig {
	path: string = "";
	readOnly: string = "";
	type: string = "string";
	key: string = "";
	value: string = "";
	help: string = "";
	constructor() { }
}

export class CrxConfig {
	id: number;
	objectType: string;
	objectId: number;
	keyword: string;
	value: string;
	constructor() { }
}

export class EduRoom {
	id?: number;
	name: string = "";
	description: string = "";
	hwconfId: number = 0;
	netMask?: number = 0;
	devCount?: number = 0;
	devices?: any;
	users?: User[];
	startIP?: string = "";
	roomType: string = "";
	roomControl: string = "";
	network: string;
	places: number = 0;
	rows: number = 0;
	accessInRooms?: AccessInRooms;
	constructor() { }
}

export interface SmartRoom {
	id?: number,
	name: string,
	description: string,
	validFrom?: number,
	validUntil?: number,
	creatorId?: number,
	deviceIds?: number[],
	hwConfIds?: number[],
	roomIds?: number[],
	userIds?: number[],
	groupIds?: number[],
	announcementIds?: number[],
}

export interface SmartRoomStatus {
	userId: number,
	deviceId: number
}


export class PositivList {
	id?: number = 0;
	name: string = "";
	description: string = "";
	subject: string = "";
	domains: string = "";
	constructor() { }
}

export interface AccessStatus {
	id?: number,
	accessType?: string,
	action?: string,
	roomId: any,
	monday?: boolean,
	tuesday?: boolean,
	wednesday?: boolean,
	thursday?: boolean,
	friday?: boolean,
	saturday?: boolean,
	sunday?: boolean,
	holiday?: boolean,
	direct: boolean,
	login: boolean,
	portal: boolean,
	printing: boolean,
	proxy: boolean,
	pointInTime?: string
}

export class SubjectArea {
	id: number
	creator_id: number = 0
	name: string = ""
	constructor() {}
}

export class TeachingSubject {
	id: number = 0
	creator_id: number = 0
	name: string = ""
	subjectAreas: SubjectArea[] = []
	constructor() { }
}

export class CrxQuestionAnswer {
	id?: number
	answer: string = ""
	correct: boolean = false
	constructor(answer?: string) {
		this.answer = answer
	}
}

export class CrxQuestion {
	id?: number = 0;
	question: string = ""
	answerType: string = ""
	value: number = 1
	crxQuestionAnswers: CrxQuestionAnswer[] = []
	constructor(question?: string) {
		this.question = question;
	}
}

export class CrxChallenge {
	id?: number
	creatorId: number;
	description: string = ""
	questions: CrxQuestion[] = []
	groups: Group[] = []
	users: User[] = []
	studentsOnly?: boolean = false;
	released: boolean = false;
	teachingSubject: TeachingSubject
}

export class CrxChallengeAnswer {
	id: number
	creator_id: number = 0
	correct: boolean = false
	constructor() { }
}

export class CrxCalendar {
	id: number = 0
	creatorId: number
	created: Date | string
	modified: Date | string
	uuid: string
	allDay: boolean = false
	editable: boolean = true
	start: Date | string
	end: Date | string
	duration: number
	title: string
	description: string
	location: string
	userIds: number[] = []
	groupIds: number[] = []
	groups: Group[] = []
	users: User[] = []
	room: Room
	category: string = 'private'
	color: string
	rrule: string | any
}

export class RecRule {
	freq: Frequency = RRule.WEEKLY
	interval: number = 1
	byweekday: any[] = []
	bymonth: any[] = []
	byhour: any = "10"
	byminute: any = "00"
	dtstart: Date = new Date()
	count: number = 0
	until: Date
}

export class ParentRequest {
	id: number = 0
	parentId: number
	givenName: string
	surName: string
	birthDay: string
	className: string
	proceeded: boolean = false
}

export class Parent extends User {
}

export class PTMEvent {
	id: number = 0
	start: Date
	end: Date
	blocked: boolean
	parent: User
	student: User
}

export class PTMTeacherInRoom {
	id: number = 0
	room: Room
	teacher: User
	events: PTMEvent[]
}

export class ParentTeacherMeeting {
	id: number = 0
	title: string
	start: Date | string
	end: Date | string
	duration: number = 10
	startRegistration: Date | string
	endRegistration: Date | string
	ptmTeacherInRoomList: PTMTeacherInRoom[] = []
	released: boolean = false
	templateId?: number
	classes: Group[] = []
}

export class IdRequest {
	id: number = 0
	creator: User = new User
	created: Date | string
	modified: Date | string
	uuid: string = ""
	allowed: boolean = false
	comment: string = ""
	validUntil: string = ""
	avatar: string = ""
	picture: string = ""
	googleUrl: string = ""
	appleUrl: string = ""
}

export class CrxNotice {
	id: number = 0
	creator: User = new User()
	created: Date | string = new Date()
	modified: Date | string = new Date()
	reminder: Date | string = ""
	title: string = ""
	noticeType: string = ""
	text: string = ""
	grading: number = 0
	weighting: number = 1
	objectType: string = ""
	objectId: number = 0
	issueType: string = ""
	issueId: number = 0
}

export class CrxTicketArticle {
	id: number = 0
	creator: User = new User()
	created: Date | string = new Date()
	modified: Date | string = new Date()
	reminder: Date | string = new Date()
	seen: boolean = false
	workTime: number = 0
	text: string = ""
}

export class CrxTicket {
	id: number = 0
	creator: User = new User()
	assignee: User = new User()
	created: Date | string = new Date()
	modified: Date | string = new Date()
	title: string = ""
	ticketStatus: string = "N"
	rooms: Room[] = []
	devices: Device[] = []
	printers: Printer[] = []
	text: string = ""
}