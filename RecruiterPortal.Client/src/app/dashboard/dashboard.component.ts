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
        this.router.navigate(["view-by-applicant", selectedDataIndex]);
    }

    getApplicantStatusCount() {
        this.dashboardService.getApplicantStatusCount().subscribe(res => {            
            this.generateApplicantStatusCountFunnelChart(res.body.NewLeads, res.body.PreScreened, res.body.PhoneScreened,
                res.body.FinalInterview, res.body.Offered, res.body.Accepted, res.body.Refused, res.body.Rejected)
        },
            err => {
            });
    }

    generateApplicantStatusCountFunnelChart(lead: any, preScreen: any, phScreend: any, interview: any, offered: any, accepted: any, refused: any, rejected: any) {
        const data = [
            { label: 'New Lead', value: lead },
            { label: 'Pre-screened', value: preScreen },
            { label: 'Phone Screened', value: phScreend },
            { label: 'Final Interview', value: interview },
            { label: 'Offered', value: offered },
            { label: 'Accepted', value: accepted },
            { label: 'Refused', value: refused },
            { label: 'Rejected', value: rejected },
        ];        

        var options = {
            chart: {
                bottomWidth: 1 / 3,
                bottomPinch: 0,
                inverted: false,
                horizontal: false,
                animate: 0,
                curve: {
                    enabled: false,
                    height: 20,
                    shade: -0.4,
                },
                totalCount: null,
            },
            block: {
                dynamicHeight: false,
                dynamicSlope: false,
                barOverlay: false,                
                minHeight: 0,
                highlight: true,
            },
            label: {
                enabled: true,
                fontFamily: null,
                fontSize: '14px',
                fill: '#fff',
                format: '{l}: {f}',
            },
            tooltip: {
                enabled: false,
                format: '{l}: {f}',
            },
            events: {
                click: {
                    block: (event, d) => {
                        const label = d.label.raw;                                              
                        const value = +d.value;                        
                        switch (label) {
                            case 'New Lead': {
                                this.router.navigate(["lead"]);
                                break;
                            }
                            case 'Pre-screened': {   
                                this.router.navigate(["paper-screened"]);
                                break;
                            }
                            case 'Phone Screened': {
                                this.router.navigate(["phone-screened"]);
                                break;
                            }
                            case 'Final Interview': {
                                this.router.navigate(["final-interview"]);
                                break;
                            }
                            case 'Offered': {
                                this.router.navigate(["offered"]);
                                break;
                            }
                            case 'Accepted': {
                                this.router.navigate(["accepted"]);
                                break;
                            }
                            case 'Refused': {
                                this.router.navigate(["refused"]);
                                break;
                            }
                            case 'Rejected': {
                                this.router.navigate(["rejected"]);
                                break;
                            }
                            default: {                                
                                break;
                            } 
                        }
                    },
                },
            },
        };
        var shortData = data.sort(function (a, b) {
            return b.value - a.value
        });
        const chart = new D3Funnel('#funnel');        
        chart.draw(shortData, options);
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
