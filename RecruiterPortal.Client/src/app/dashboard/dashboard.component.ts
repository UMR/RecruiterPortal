import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    applicantCount: any;
    data1: any;

    ngOnInit() {
        //const documentStyle = getComputedStyle(document.documentElement);
        //const textColor = documentStyle.getPropertyValue('--text-color');
        //const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        //const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    }



    constructor(private dashboardService: DashboardService) {
        this.getApplicantCount();
        //this.getApplicantStatus();
        this.data1 = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Sep', 'October', 'November', 'December'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: "#FF6384",
                    //backgroundColor: (documentStyle as any).getPropertyValue('--blue-500'),
                    //borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: [65, 59, 80, 81, 56, 55, 40, 50, 30, 55, 60, 70]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: "#36A2EB",
                    //borderColor: documentStyle.getPropertyValue('--pink-500'),
                    data: [28, 48, 40, 19, 86, 27, 90, 70, 60, 50, 10, 20]
                }
            ]
        };
    }

    getApplicantCount() {
        this.dashboardService.getApplicantCount().subscribe(res => {
            console.log(res.body);
            this.getApplicantStatus(res.body.TotalApplicant, res.body.VerifiedApplicant, res.body.NotVerifiedApplicant)
        },
            err => {
            },
            () => {
            });
    }
    getApplicantStatus(totalApplicant: any, verifiedApplicant: any, notVerifiedApplicant: any) {
        this.applicantCount = {
            labels: ['Total Applicant','Verified Applicant', 'Not Verified Applicant' ],
            datasets: [
                {
                    data: [totalApplicant,verifiedApplicant, notVerifiedApplicant],
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
