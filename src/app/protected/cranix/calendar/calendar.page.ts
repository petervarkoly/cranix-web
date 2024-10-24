import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  ChangeDetectorRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { RRule } from 'rrule';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarDayViewBeforeRenderEvent,
  CalendarMonthViewBeforeRenderEvent,
  CalendarWeekViewBeforeRenderEvent,
  CalendarView
} from 'angular-calendar';
import * as moment from 'moment'
import { EventColor, ViewPeriod } from 'calendar-utils';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
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
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  viewPeriod?: ViewPeriod;

  viewDate: Date = new Date();
  double = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09']
  eventMinuteValues = "0,5,10,15,20,25,30,35,40,45,50,55"
  yearValues = ['2024','2025','2026']
  calendars: Group[] = [];
  selectedCalendars: Group[];
  selectedCalendarIds: number[];
  rruleFrequents = [
    'days', 'weeks', 'months'
  ]
  categories = ['private', 'individual'];
  isModalOpen: boolean = false;
  addEditEventTitle: string = "Add Event"
  events: any[] = [];
  recurringEvents: any[] = [];
  normalEvents: any[] = [];
  viewTitle: any;
  minDate: string;
  maxDate: string;
  selectedEvent: any;
  oneDay = 86400000;
  isToday: boolean;
  refresh = new Subject<void>();
  activeDayIsOpen: boolean = true;

  /* Constructor */
  constructor(
    private authService: AuthenticationService,
    private calendarS: CrxCalendarService,
    private objectS: GenericObjectService,
    private userS: UsersService,
    private cdr: ChangeDetectorRef
  ) {
    this.userS.getUsersGroups(this.authService.session.userId).subscribe(
      (val) => {
        this.calendars = val
        this.selectedCalendars = val
        this.selectedCalendarIds = []
        for (let group of val) {
          this.selectedCalendarIds.push(group.id)
          this.categories.push(group.name)
        }
      }
    );
    this.isToday = false;
    this.loadData();
  }


  adjustMinMaxDate() {
    let min = new Date();
    let max  = new Date(min.getTime() + 3600*86400000)
    this.minDate = this.toIonISOString(min);
    this.maxDate = this.toIonISOString(max)
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
        this.events = []
        this.recurringEvents = []
        this.normalEvents = []
        for (let event of val) {
          event.start = new Date(event.start)
          event.end = new Date(event.end)
          if (event.rruleFreq) {
            if(event.rruleUntil) {
              event.rruleUntil = new Date(event.rruleUntil)
            }
            this.recurringEvents.push(event)
          } else {
            this.events.push(event)
            this.normalEvents.push(event)
          }
          
        }
        console.log(this.events)
      }
    )
  }

  /*
  * Handle calendar events
  */
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(date, events)
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    console.log(event,newStart,newEnd)
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(action, event)
  }

  updateCalendarEvents(
    viewRender:
      | CalendarMonthViewBeforeRenderEvent
      | CalendarWeekViewBeforeRenderEvent
      | CalendarDayViewBeforeRenderEvent
  ): void {
    if (
      !this.viewPeriod ||
      !moment(this.viewPeriod.start).isSame(viewRender.period.start) ||
      !moment(this.viewPeriod.end).isSame(viewRender.period.end)
    ) {
      this.viewPeriod = viewRender.period;
      this.events = [];
      for( let event of this.normalEvents) {
        this.events.push(event);
      }

      this.recurringEvents.forEach((event) => {
        const rule: RRule = new RRule({
          ...event.rrule,
          dtstart: moment(viewRender.period.start).startOf('day').toDate(),
          until: moment(viewRender.period.end).endOf('day').toDate(),
        });
        const { title, color } = event;

        rule.all().forEach((date) => {
          this.events.push({
            title,
            color,
            start: moment(date).toDate(),
          });
        });
      });
      this.cdr.detectChanges();
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  toggleAddEditModal(open: boolean) {
    this.isModalOpen = open
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
      let delay = Math.floor((this.selectedEvent.endTime.getTime() - this.selectedEvent.startTime.getTime())/this.oneDay);
      console.log(delay)
      /*this.selectedEvent.startTime.setTime(
        this.selectedEvent.startTime.getTime() + 
        this.selectedEvent.startTime.getTimezoneOffset()*60*1000
      );*/
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
    //this.calendar.currentDate = this.selectedEvent.startTime;
    this.selectedEvent = {}
  }
}
