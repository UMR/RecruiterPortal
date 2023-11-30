import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { CalendarService } from './calendar.service';
import { CalendarOptions, EventClickArg, DateSelectArg } from '@fullcalendar/core';
import { InterViewScheduleModel } from './interview-schedule';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';


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
    private startDate: any;
    private endDate: any;

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
    constructor(private calendarService: CalendarService, private fb: FormBuilder, private messageService: MessageService) { }

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
        this.startDate = selectInfo.startStr;
        this.endDate = selectInfo.endStr;

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
    onScheduleSubmit() {
        var requestObj = new InterViewScheduleModel();
        requestObj.StartDate = this.startDate;
        requestObj.EndDate = this.endDate;
        requestObj.Title = this.scheduleForm.get('title').value;;
        requestObj.Description = this.scheduleForm.get('description').value;;
        requestObj.Id = 0;

        this.calendarService.addInterviewSchedule(requestObj).subscribe(res => {
            this.getInterviewByRecruiterId();
            this.interviewDialog = false;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Shedule added successful', life: 3000 });
        },
            error => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Shedule added faild', life: 3000 });
            },
            () => {
                //this.isLoading = false;
            })
    }
    hideDialog() {
        this.interviewDialog = false;
    }
}
