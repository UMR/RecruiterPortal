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
    private scheduleId: number = 0;
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
        this.calendarService.getInterviewSchedule()
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
        this.scheduleId = +clickInfo.event.id;
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
        this.calendarService.getScheduleById(this.scheduleId)
            .subscribe(response => {
                if (response.status === 200) {
                    console.log(response);
                    this.scheduleForm.patchValue({
                        title: response.body.Title,
                        description: response.body.Description
                    });
                    this.startDate = response.body.StartDate
                    this.endDate = response.body.EndDate
                }
            },
                err => {
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Error', detail: "Failed get schedule" });
                },
                () => {
                });
    }

    onDeleteClick() {
        this.confirmationDialog = false;
        this.deleteShedule(this.scheduleId);
        this.scheduleId = 0;
    }

    onClickCancel() {
        this.scheduleForm.reset();
        this.confirmationDialog = false;
        this.scheduleId = 0;
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
        if (this.scheduleId != 0) {
            requestObj.Id = this.scheduleId;
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
    onClickClear() {
        this.scheduleForm.reset();
    }
}
