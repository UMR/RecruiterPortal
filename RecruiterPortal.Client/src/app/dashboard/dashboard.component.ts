import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

    applicantCount: any;
    jobCount: any;
    statusCount: any;
    data1: any;

    applicantCountOptions: any;

    constructor(private router: Router, private dashboardService: DashboardService) {
        this.getApplicantCount();
        this.getJobCount();
        this.getApplicantStatusCount();
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
            this.getStatus(res.body.NewLeads, res.body.PreScreened, res.body.PhoneScreened,
                res.body.FinalInterview, res.body.Offered, res.body.Accepted, res.body.Refused, res.body.Rejected)
        },
            err => {
            },
            () => {
            });
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
