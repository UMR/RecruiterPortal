import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { CalendarService } from './calendar.service';
import { CalendarOptions, EventClickArg, DateSelectArg } from '@fullcalendar/core';
import { InterViewSchedule } from './interview-schedule';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
    public events: any[];
    public options: any;
    public addEditTxt: string = "Add";
    public interviewDialog: boolean = false;
    public scheduleForm: FormGroup;

    calendarOptions: CalendarOptions = {
        plugins: [
            interactionPlugin,
            dayGridPlugin,
            timeGridPlugin,
            listPlugin
        ],
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        initialView: 'dayGridMonth',
        weekends: true,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        dateClick: (e) => {
            this.handleDateClick(e)
        },
        eventClick: (ee) => {
            this.handleEventClick(ee)
        },
        select: (eee) => {
            this.handleDateSelect(eee)
        }

    };
    constructor(private calendarService: CalendarService, private fb: FormBuilder) { }

    ngOnInit() {
        //this.events = jsonData.data;
        this.getInterviewByRecruiterId();
        this.createForm();
    }

    createForm() {
        this.scheduleForm = this.fb.group({
            title: ["", Validators.required],
            description: [""]
        });
    }

    getInterviewByRecruiterId() {
        this.calendarService.getInterviewScheduleById()
            .subscribe(response => {
                if (response.status === 200) {
                    let allData: any[] = [];
                    for (let i = 0; i < response.body.length; i++) {
                        let data = {
                            title: response.body[i].Title,
                            id: response.body[i].Id,
                            start: response.body[i].StartDate,
                            end: response.body[i].EndDate
                        }
                        allData.push(data);
                    }

                    this.events = allData;
                }
            },
                err => {
                },
                () => {
                });
    }

    handleDateClick(arg) {

        //alert('date click! ' + arg.dateStr)
    }

    handleEventClick(clickInfo: EventClickArg) {
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            clickInfo.event.remove();
        }
    }

    handleDateSelect(selectInfo: DateSelectArg) {
        this.interviewDialog = true;
        console.log(selectInfo);

        //if (title) {
        //    calendarApi.addEvent({
        //        //id: createEventId(),
        //        title,
        //        start: selectInfo.startStr,
        //        end: selectInfo.endStr,
        //        allDay: selectInfo.allDay
        //    });
        //}

        const calendarApi = selectInfo.view.calendar;

        calendarApi.unselect(); // clear date selection
    }

    hideDialog() {
        this.interviewDialog = false;
    }
}
