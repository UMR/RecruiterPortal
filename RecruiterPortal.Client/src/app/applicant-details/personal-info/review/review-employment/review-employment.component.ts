import { Component, OnInit } from '@angular/core';
import { ReviewEmploymentService } from './review-employment.service';

@Component({
    selector: 'app-review-employment',
    templateUrl: './review-employment.component.html',
    styleUrls: ['./review-employment.component.css']
})
export class ReviewEmploymentComponent implements OnInit {

    public employments: any = [];

    constructor(private employmentService: ReviewEmploymentService) {
    }

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.employmentService.getEmploymentsByUserId()
            .subscribe(data => {
                this.employments = data;
            },
                err => {
                    console.log(err);
                });
    }

    getClientFormattedDate(value): string {
        if (value) {
            let dateObj = new Date(value);
            let month = dateObj.getMonth() + 1;
            let day = dateObj.getDate();
            let year = dateObj.getFullYear();

            return month + "-" + day + "-" + year;
        }

        return '';
    }

}
