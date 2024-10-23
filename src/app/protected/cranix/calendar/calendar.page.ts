import { Component, ViewChild } from '@angular/core';
import { CalendarComponent, CalendarMode, QueryMode, Step } from './Ionic2-Calendar';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { IEvent } from './Ionic2-Calendar/calendar.interface';

import { CrxCalendar, Group } from 'src/app/shared/models/data-model';
import { UsersService } from 'src/app/services/users.service';
import { AuthenticationService } from 'src/app/services/auth.service';
import { CrxCalendarService } from 'src/app/services/crx-calendar.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
registerLocaleData(localeDe, 'de-DE', localeDeExtra);

@Component({
  selector: 'crs-calendar-page',
  templateUrl: 'calendar.page.html',
  styleUrls: ['calendar.page.scss'],
})
export class CalendarPage {
  @ViewChild(CalendarComponent) myCalendar!: CalendarComponent;
  double = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09']
  eventMinuteValues = "0,5,10,15,20,25,30,35,40,45,50,55"
  calendars: Group[] = [];
  selectedCalendars: Group[];
  selectedCalendarIds: number[];
  rruleFrequents = [
    'days', 'weeks', 'months'
  ]
  categories = ['private', 'individual'];
  isModalOpen: boolean = false;
  addEditEventTitle: string = "Add Event"
  eventSource: any[] = [];
  viewTitle: any;

  selectedEvent: any;
  oneDay = 86400000;
  isToday: boolean;
  calendar = {
    mode: 'month' as CalendarMode,
    queryMode: 'local' as QueryMode,
    step: 30 as Step,
    currentDate: new Date(),
    dateFormatter: {
      formatWeekViewHourColumn: function (date: Date) {
        return date.getHours().toString();
      },
      formatDayViewHourColumn: function (date: Date) {
        return date.getHours().toString();
      }
    },
    formatDay: "'Day' dd",
    formatDayHeader: "'Day' EEE",
    formatDayTitle: "'Day' MMMM dd, yyyy",
    formatWeekTitle: "'Week' w",
    formatWeekViewDayHeader: "'Day' EEE d",
    formatHourColumn: "H",
    showEventDetail: false,
    startingDayMonth: 1,
    startingDayWeek: 1,
    allDayLabel: 'testallday',
    noEventsLabel: 'None',
    timeInterval: 15,
    autoSelect: false,
    locale: 'de-DE',
    dir: 'rtl',
    scrollToHour: 11,
    preserveScrollPosition: true,
    lockSwipeToPrev: true,
    lockSwipeToNext: true,
    lockSwipes: true,
    startHour: 7,
    endHour: 20,
    sliderOptions: {
      spaceBetween: 10,
    },
    dayviewCategorySource: new Set(this.categories),
    dayviewShowCategoryView: true,
  };

  constructor(
    private authService: AuthenticationService,
    private calendarS: CrxCalendarService,
    private objectS: GenericObjectService,
    private userS: UsersService

  ) {
    this.userS.getUsersGroups(this.authService.session.userId).subscribe(
      (val) => {
        this.calendars = val
        this.selectedCalendars = val
        this.selectedCalendarIds = []
        for (let group of val) {
          this.selectedCalendarIds.push(group.id)
          this.categories.push(group.name)
          this.calendar.dayviewCategorySource = new Set(this.categories)
        }
      }
    );
    this.isToday = false;
    this.loadData();
  }

  isCalendarSelected(event: CrxCalendar) {
    //console.log(event.id)
    if (event.category == 'private' || event.category == 'individual') return true;
    for (let a of event.groupIds) {
      if (this.selectedCalendarIds.includes(a)) return true;
    }
    return false;
  }

  isWritable() {
    if (this.selectedEvent) {
      //New event
      if (!this.selectedEvent.id) return true;
      //Owned event
      if (this.selectedEvent.creatorId == this.authService.session.userId) return true;
      //TODO additional rights.
    }
    return false;
  }

  loadData() {
    this.calendarS.get().subscribe(
      (val) => {
        this.eventSource = []
        for (let event of val) {
          event.startTime = new Date(event.startTime)
          event.endTime = new Date(event.endTime)
          if (event.rruleUntil) {
            event.rruleUntil = new Date(event.rruleUntil)
          }
          this.eventSource.push(event)
        }
        console.log(this.eventSource)
      }
    )
  }

  toggleAddEditModal(open: boolean) {
    this.isModalOpen = open
  }

  segmentChanged(event: any) {
    this.calendar.mode = <CalendarMode>event.detail.value;
  }
  next() {
    this.myCalendar.slideNext();
  }

  back() {
    this.myCalendar.slidePrev();
  }

  toDay() {
    this.calendar.currentDate = new Date()
  }
  selectedCalendarsChanged() {
    this.selectedCalendarIds = []
    for (let group of this.selectedCalendars) {
      this.selectedCalendarIds.push(group.id)
    }
  }
  onViewTitleChanged(title: string) {
    this.viewTitle = title;
    console.log(
      'view title changed: ' + title + ', this.viewTitle: ' + this.viewTitle
    );
  }

  getDouble(num: number) {
    if (this.double[num]) return this.double[num]
    return num
  }
  toIonISOString(dt: Date | undefined) {
    if (dt) {
      return dt.getFullYear() + "-" +
        this.getDouble(dt.getMonth() + 1) + "-" +
        this.getDouble(dt.getDate()) + "T" +
        this.getDouble(dt.getHours()) + ":" +
        this.getDouble(dt.getMinutes())
    }
    return ""
  }

  toIonDate(dt: Date | undefined) {
    if (dt) {
      return dt.getFullYear() + "-" +
        this.getDouble(dt.getMonth() + 1) + "-" +
        this.getDouble(dt.getDate())
    }
    return ""
  }
  adaptEventTimes() {
    if (this.selectedEvent.allDay) {
      this.selectedEvent.startTime = this.toIonDate(new Date(this.selectedEvent.startTime))
      this.selectedEvent.endTime = this.toIonDate(new Date(this.selectedEvent.endTime))
    } else {
      this.selectedEvent.startTime = this.toIonISOString(new Date(this.selectedEvent.startTime))
      this.selectedEvent.endTime = this.toIonISOString(new Date(this.selectedEvent.endTime))
    }
  }

  onEventSelected(event) {
    this.selectedEvent = {}
    for( let key of Object.getOwnPropertyNames(event)) {
      this.selectedEvent[key] = event[key]
    }
    if (this.selectedEvent.allDay) {
      this.selectedEvent.startTime = this.toIonDate(<Date>event.startTime)
      this.selectedEvent.endTime = this.toIonDate(<Date>event.endTime)
    } else {
      this.selectedEvent.startTime = this.toIonISOString(<Date>event.startTime)
      this.selectedEvent.endTime = this.toIonISOString(<Date>event.endTime)
    }
    if (event.rruleFreq) {
      this.selectedEvent.recurring = true
      this.selectedEvent.rruleUntil = this.toIonDate(<Date>event.rruleUntil)
    }
    this.addEditEventTitle = "Edit Event"
    this.isModalOpen = true
  }

  addNewEvent() {
    if (this.isModalOpen == true) return;
    let now = this.toIonISOString(new Date());
    this.selectedEvent = {
      allDay: false,
      title: "",
      desciption: "",
      location: "",
      startTime: now,
      endTime: now,
      recurring: false,
      rruleFreq: null,
      rruleInterval: null,
      rruleUntil: undefined,
      category: 'private'
    }
    console.log(this.selectedEvent)
    this.addEditEventTitle = "Add Event"
    this.toggleAddEditModal(true);
  }

  onTimeSelected(ev: any) {
    if (this.isModalOpen == true) return;
    this.selectedEvent = {
      allDay: false,
      title: "",
      startTime: this.toIonISOString(<Date>ev.selectedTime),
      endTime: this.toIonISOString(<Date>ev.selectedTime),
      recurring: false,
      rruleFreq: null,
      rruleInterval: null,
      rruleUntil: undefined,
      category: ev.category ? ev.category : 'private'
    }
    this.addEditEventTitle = "Add Event"
    this.toggleAddEditModal(true);
    console.log(ev)
  }

  addEditEvent(modal: any) {
    modal.dismiss()
    this.isModalOpen = false
    this.selectedEvent.startTime = new Date(this.selectedEvent.startTime)
    this.selectedEvent.endTime = new Date(this.selectedEvent.endTime)
    if(this.selectedEvent.allDay) {
      let delay = this.selectedEvent.endTime.getTime() - this.selectedEvent.startTime.getTime();
      this.selectedEvent.startTime.setTime(
        this.selectedEvent.startTime.getTime() + 
        this.selectedEvent.startTime.getTimezoneOffset()*60*1000
      );
      this.selectedEvent.endTime.setTime(
        this.selectedEvent.startTime.getTime() + ((delay + 1) * this.oneDay) - 1
      );
    }
    if (this.selectedEvent.recurring && this.selectedEvent.rruleUntil) {
      this.selectedEvent.rruleUntil = new Date(this.selectedEvent.rruleUntil)
    }
    console.log(this.selectedEvent)
    if (this.selectedEvent.id) {
      this.calendarS.modify(this.selectedEvent).subscribe(
        (val) => {
          this.loadData()
          this.objectS.responseMessage(val)
        }
      )
    } else {
      this.calendarS.add(this.selectedEvent).subscribe(
        (val) => {
          this.loadData()
          this.objectS.responseMessage(val)
        }
      )
    }
    this.calendar.currentDate = this.selectedEvent.selectedTime;
    this.selectedEvent = {}
  }

  changeMode(mode: any) {
    this.calendar.mode = mode;
  }

  today() {
    this.calendar.currentDate = new Date()
  }

  onCurrentDateChanged(ev: Date) {
    /* var today = new Date();
    today.setHours(0, 0, 0, 0);
    ev.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === ev.getTime(); */
    console.log('Currently viewed date: ' + ev);
  }

  onRangeChanged(ev: any) {
    console.log(
      'range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime
    );
  }

  onDayHeaderSelected = (ev: {
    selectedTime: Date;
    events: any[];
    disabled: boolean;
  }) => {
    console.log(
      'Selected day: ' +
      ev.selectedTime +
      ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) +
      ', disabled: ' +
      ev.disabled
    );
  };

  markDisabled = (date: Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };
}
