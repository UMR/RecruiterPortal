import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {



    ngOnInit() {
        //const documentStyle = getComputedStyle(document.documentElement);
        //const textColor = documentStyle.getPropertyValue('--text-color');
        //const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        //const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        console.log("dadad")
    }

    data: any;
    data1: any;

    constructor() {
        this.data = {
            labels: ['A', 'B', 'C','D'],
            datasets: [
                {
                    data: [300, 50, 100, 50],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#5BFF33"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#5BFF33"
                    ]
                }]
        };

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

}
