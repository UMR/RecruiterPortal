import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';
import { CalendarOptions, EventClickArg, DateSelectArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { CalendarService } from '../calendar/calendar.service';
import D3Funnel from 'd3-funnel';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    public events: any[];
    applicantCount: any;
    jobCount: any;
    statusCount: any;
    data1: any;

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
            //this.handleEventClick(ee)
        },
        select: (eee) => {
            // this.handleDateSelect(eee)
        }
    };
    applicantCountOptions: any;

    constructor(private router: Router, private calendarService: CalendarService, private dashboardService: DashboardService) {
        this.getApplicantCount();
        this.getJobCount();
        this.getApplicantStatusCount();
        this.getInterviewByRecruiterId()
        //this.getApplicantStatus();
        this.data1 = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Sep', 'October', 'November', 'December'],
            datasets: [
                //{
                //    label: 'My First dataset',
                //    backgroundColor: "#FF6384",
                //    data: [65, 59, 80, 81, 56, 55, 40, 50, 30, 55, 60, 70]
                //},
                {
                    label: 'Applicant Volume',
                    backgroundColor: "#36A2EB",
                    data: [28, 48, 40, 19, 86, 27, 90, 70, 60, 50, 10, 20]
                }
            ]
        };
    }

    ngOnInit() {

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

    getApplicantCount() {
        this.dashboardService.getApplicantCount().subscribe(res => {
            this.generateApplicantCountPieChart(res.body.TotalApplicant, res.body.VerifiedApplicant, res.body.NotVerifiedApplicant)
        },
            err => {
            });
    }

    generateApplicantCountPieChart(totalApplicant: any, verifiedApplicant: any, notVerifiedApplicant: any) {
        this.applicantCount = {
            labels: ['Total Applicant : ' + totalApplicant, 'Verified Applicant : ' + verifiedApplicant, 'Not Verified Applicant : ' + notVerifiedApplicant],
            datasets: [
                {
                    data: [totalApplicant, verifiedApplicant, notVerifiedApplicant],
                    backgroundColor: [
                        "#5BFF33",
                        "#36A2EB",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#5BFF33",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]
        };

        this.applicantCountOptions = {
            legend: {
                position: 'left'
            },
            tooltips: {
                enabled: true
            }
        };
    }

    onApplicantCountSliceClick(event) {
        const selectedLabel = this.applicantCount.labels[event.element._index];
        const selectedDataIndex = event.element._index;
        console.log('Selected Label:', selectedLabel);
        console.log('Selected Data Index:', selectedDataIndex);
        this.router.navigate(["view-by-applicant", selectedDataIndex]);
    }

    getApplicantStatusCount() {
        this.dashboardService.getApplicantStatusCount().subscribe(res => {
            //this.getStatus(res.body.NewLeads, res.body.PreScreened, res.body.PhoneScreened,
            //    res.body.FinalInterview, res.body.Offered, res.body.Accepted, res.body.Refused, res.body.Rejected)
            this.generateApplicantStatusFunnelChart(res.body.NewLeads, res.body.PreScreened, res.body.PhoneScreened,
                res.body.FinalInterview, res.body.Offered, res.body.Accepted, res.body.Refused, res.body.Rejected)
        },
            err => {
            });
    }

    generateApplicantStatusFunnelChart(lead: any, preScreen: any, phScreend: any, interview: any, offered: any, accepted: any, refused: any, rejected: any) {
        const data = [
            { label: 'New Lead', value: lead },
            { label: 'Pre-screened', value: preScreen },
            { label: 'Phone Screened', value: phScreend },
            { label: 'Final Interview', value: interview },
        ];
        const options = {
            block: {
                dynamicHeight: true,
                minHeight: 15,
            },
        };

        const chart = new D3Funnel('#funnel');
        chart.draw(data, options);
    }

    getStatus(lead: any, preScreen: any, phScreend: any, interview: any, offered: any, accepted: any, refused: any, rejected: any) {
        this.statusCount = {
            labels: ['New Lead: ' + lead, 'Pre-screened : ' + preScreen, 'Phone Screened : ' + phScreend
                , 'Final Interview : ' + interview, 'Offered : ' + offered, 'Accepted : ' + accepted
                , 'Refused : ' + refused, 'Rejected : ' + rejected],
            datasets: [
                {
                    data: [lead, preScreen, phScreend, interview, offered, accepted, refused, rejected],
                    backgroundColor: [
                        "#5BFF33",
                        "#36A2EB",
                        "#FFCE56",
                        "#FF6384",
                        "#4BC0C0",
                        "#E7E9ED",
                        "#33ffc9",
                        "#15ad85"
                    ],
                    hoverBackgroundColor: [
                        "#5BFF33",
                        "#36A2EB",
                        "#FFCE56",
                        "#FF6384",
                        "#4BC0C0",
                        "#E7E9ED",
                        "#33ffc9",
                        "#15ad85"
                    ]
                }]
        };
    }

    getJobCount() {
        this.dashboardService.getJobCount().subscribe(res => {
            this.getJobStatus(res.body.TotalJob, res.body.ActiveJob, res.body.InActiveJob)
        },
            err => {
            },
            () => {
            });
    }

    getJobStatus(totalJob: any, activeJob: any, inActiveJob: any) {
        this.jobCount = {
            labels: ['Total Job : ' + totalJob, 'Active Job : ' + activeJob, 'In Active Job : ' + inActiveJob],
            datasets: [
                {
                    data: [totalJob, activeJob, inActiveJob],
                    backgroundColor: [
                        "#5BFF33",
                        "#36A2EB",
                        "#FFCE56"

                    ],
                    hoverBackgroundColor: [
                        "#5BFF33",
                        "#36A2EB",
                        "#FFCE56"

                    ]
                }]
        };
    }

}
