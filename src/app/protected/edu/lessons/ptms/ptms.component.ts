import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { LanguageService } from 'src/app/services/language.service';
import { NoticesService } from 'src/app/services/notices.service';
import { ParentsService } from 'src/app/services/parents.service';
import { SystemService } from 'src/app/services/system.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CrxNotice, ParentTeacherMeeting, PTMEvent, PTMTeacherInRoom, Room, User } from 'src/app/shared/models/data-model';
import { WindowRef } from 'src/app/shared/models/ohters';

@Component({
  standalone: false,
    selector: 'app-ptms',
  templateUrl: './ptms.component.html',
  styleUrl: './ptms.component.css'
})
export class PtmsComponent implements OnInit {

  addEditPTMTitle: string = ""
  freeRooms: Room[]
  noPTM: boolean = false;
  isAddPTMOpen: boolean = false;
  selectedPTM: ParentTeacherMeeting
  selectedEvent: PTMEvent = new PTMEvent()
  selectedEventRegistered: boolean = false
  selectedNotice: CrxNotice = new CrxNotice()
  isNoticeOpen: boolean = false
  isRegisterEventOpen = false
  instituteName: string = ""
  nextPtms: ParentTeacherMeeting[] = []
  myPTMTeacherInRoom: PTMTeacherInRoom
  students: User[] = [];
  now: Date;
  nativeWindow: any
  constructor(
    public win: WindowRef,
    public authService: AuthenticationService,
    private languageS: LanguageService,
    private objectService: GenericObjectService,
    private noticeService: NoticesService,
    public ptmService: ParentsService,
    private utilService: UtilsService,
    private systemService: SystemService
  ) {
    this.systemService.getInstituteName().subscribe((val) => { this.instituteName = val })
    this.nativeWindow = win.getNativeWindow();
    this.now = new Date()
    this.readData()
  }

  ngOnInit(): void {
    console.log("ngOnInit called")
  }
  readData() {
    for (let s of this.objectService.allObjects['user']) {
      if (s.role == 'students') this.students.push(s)
    }
    this.ptmService.get().subscribe((val) => {
      this.nextPtms = val
      if (val.length < 1) {
        this.noPTM = true;
      }
      if (val.length == 1) {
        this.selectPTM(val[0])
      }
    })
  }
  deselect() {
    this.selectedPTM = null;
    this.readData()
  }
  compare(a: any, b: any) {
    return new Date(a.start).getTime() - new Date(b.start).getTime()
  }
  getStudentOfEvent(event: PTMEvent) {
    if (!event.blocked) {
      return event.student ? event.student.fullName : this.languageS.trans('free')
    } else {
      return this.languageS.trans('blocked')
    }
  }
  setBlockEvent(event: PTMEvent) {
    this.ptmService.blockEvent(event.id, !event.blocked).subscribe((val) => {
      this.objectService.responseMessage(val)
      this.ptmService.getPTMById(this.selectedPTM.id).subscribe((val2) => {
        console.log(val2)
        this.selectPTM(val2)
      })
    })
  }
  selectPTM(ptm) {
    this.selectedPTM = this.ptmService.adaptPtmTimes(ptm);
    this.ptmService.getFreeRooms(this.selectedPTM.id).subscribe((val2) => {
      this.freeRooms = val2
    })
    for (let ptmTiR of this.selectedPTM.ptmTeacherInRoomList) {
      if (ptmTiR.teacher.id == this.authService.session.userId) {
        this.myPTMTeacherInRoom = ptmTiR
        console.log(ptmTiR)
        break
      }
    }
    if (!this.myPTMTeacherInRoom) {
      this.myPTMTeacherInRoom = new PTMTeacherInRoom()
    }
  }
  selectRoom() {
    let me = this.objectService.getObjectById("user", this.authService.session.userId);
    this.myPTMTeacherInRoom.teacher = me
    if (this.myPTMTeacherInRoom.id != 0) {
      this.ptmService.cancelRoomRegistration(this.myPTMTeacherInRoom.id).subscribe(
        (val) => {
          this.objectService.responseMessage(val)
        }
      )
    }
    this.ptmService.registerRoom(this.selectedPTM.id, this.myPTMTeacherInRoom).subscribe(
      (val) => {
        this.objectService.responseMessage(val)
        this.readData()
      }
    )
  }
  closeNotice(modal) {
    modal.dismiss()
    this.isNoticeOpen = false
  }
  createNotices(event: PTMEvent) {
    this.selectedEvent = event
    this.selectedNotice = new CrxNotice()
    this.selectedNotice.title = this.languageS.trans('PTM') + " " + new Date(event.start).toLocaleString()
    this.selectedNotice.objectType = "user"
    this.selectedNotice.objectId = event.student.id
    this.selectedNotice.issueType = "PTMEvent"
    this.selectedNotice.issueId = event.id
    this.noticeService.getByFilter(this.selectedNotice).subscribe(
      (val) => {
        if (val.length > 0) {
          this.selectedNotice = val[0]
        }
      })
    this.isNoticeOpen = true
    console.log(event)
  }
  saveNotice(){
    this.noticeService.add(this.selectedNotice).subscribe(
      (val) => { this.objectService.responseMessage(val)}
    )
  }
  registerEvent(event) {
    this.selectedEvent = event
    this.selectedEventRegistered = this.selectedEvent.student != null
    this.isRegisterEventOpen = true
  }
  doRegisterEvent() {
    this.ptmService.registerEvent(this.selectedEvent).subscribe((val) => {
      this.objectService.responseMessage(val)
      this.readData()
      this.isRegisterEventOpen = false
    })
  }
  cancelEvent() {
    this.ptmService.cancelEvent(this.selectedEvent.id).subscribe((val) => {
      this.objectService.responseMessage(val)
      this.isRegisterEventOpen = false
      this.readData()
    })
  }
  printRegistrations(event) {
    event.stopPropagation();
    let start = new Date(this.selectedPTM.start)
    let end = new Date(this.selectedPTM.end)
    let date = this.utilService.toIonDate(start)
    let startTime = this.utilService.toIonTime(start)
    let endTime = this.utilService.toIonTime(end)
    let html = '<h2>' + this.languageS.trans('PTM') + ' ' + date + ': ' + startTime + ' - ' + endTime + '</h2>\n'
    html += '<h2>' + this.languageS.trans('Teacher') + ': ' + this.myPTMTeacherInRoom.teacher.surName + ', ' + this.myPTMTeacherInRoom.teacher.givenName + '</h2>\n'
    html += '<h3>' + this.languageS.trans('room') + ' ' + this.myPTMTeacherInRoom.room.name + '</h3>\n'
    html += '<table style="border: 1px solid black;">'
    html += '<tr><th>'
    html += this.languageS.trans('Time')
    html += '</th><th>'
    html += this.languageS.trans('Student')
    html += '</th></tr>\n'
    for (let event of this.myPTMTeacherInRoom.events.sort(this.compare)) {
      let start = new Date(event.start)
      let time = this.utilService.toIonTime(start)
      let user = ""
      if (event.student) {
        user = event.student.surName + ", " + event.student.givenName
      }
      html += `<tr><td>${time}</td><td>${user}</td></tr>`
    }
    html += '</table>'
    console.log(html)
    var hostname = window.location.hostname;
    var protocol = window.location.protocol;
    var port = window.location.port;
    sessionStorage.setItem('printPage', html);
    sessionStorage.setItem('instituteName', this.instituteName)
    if (port) {
      this.nativeWindow.open(`${protocol}//${hostname}:${port}`);
      sessionStorage.removeItem('shortName');
    } else {
      this.nativeWindow.open(`${protocol}//${hostname}`);
      sessionStorage.removeItem('shortName');
    }
    sessionStorage.removeItem('printPage');
    sessionStorage.removeItem('instituteName')

  }

}
