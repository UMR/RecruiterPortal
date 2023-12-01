import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { CalendarService } from './calendar.service';
import { CalendarOptions, EventClickArg, DateSelectArg } from '@fullcalendar/core';
import { InterViewScheduleModel } from './interview-schedule';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';


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
    private Id: number = 0;
    public confirmationDialog: boolean = false;

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
        eventClick: (ee) => {
            this.handleEventClick(ee)
        },
        select: (eee) => {
            this.handleDateSelect(eee)
        }

    };
    constructor(private calendarService: CalendarService, private fb: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService) { }

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

    handleEventClick(clickInfo: EventClickArg) {
        this.confirmationDialog = true;
        //this.confirmation(clickInfo);

        //console.log(clickInfo.event.id);
        //if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        //    clickInfo.event.remove();
        //}
    }

    handleDateSelect(selectInfo: DateSelectArg) {
        this.interviewDialog = true;
        this.startDate = selectInfo.startStr;
        this.endDate = selectInfo.endStr;
        const calendarApi = selectInfo.view.calendar;

        calendarApi.unselect(); // clear date selection
    }

    edit() {
        this.confirmationDialog = false;
        this.interviewDialog = true;

        //this.scheduleForm.patchValue({
        //    title: clickInfo.event.title,
        //    description: clickInfo.event.title
        //})
    }

    delete() {
        this.confirmationDialog = false;
        this.deleteShedule(this.Id);
    }

    hideConfirm() {
        this.confirmationDialog = false;
    }

    deleteShedule(id) {
        this.calendarService.delete(id).subscribe(res => {
            if (res && res.status == 200) {
                this.getInterviewByRecruiterId();
                this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Successful', detail: 'Successfully Schedule Deleted' });
            }
            else {
                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Error', detail: "Schedule delete failed" });
            }
        }, err => {
            this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Error', detail: "Schedule delete failed" });
        })
    }

    onScheduleSubmit() {
        var requestObj = new InterViewScheduleModel();
        requestObj.StartDate = this.startDate;
        requestObj.EndDate = this.endDate;
        requestObj.Title = this.scheduleForm.get('title').value;;
        requestObj.Description = this.scheduleForm.get('description').value;
        if (this.Id != 0) {
            requestObj.Id = this.Id;
        }
        else {
            requestObj.Id = 0;
        }

        this.calendarService.addInterviewSchedule(requestObj).subscribe(res => {
            this.getInterviewByRecruiterId();
            this.scheduleForm.reset();
            this.interviewDialog = false;
            this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Successful', detail: 'Shedule added successful', life: 3000 });
        },
            error => {
                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Error', detail: 'Shedule added faild', life: 3000 });
            },
            () => {
                //this.isLoading = false;
            })
    }

    hideDialog() {
        this.interviewDialog = false;
        this.scheduleForm.reset();
    }
}
