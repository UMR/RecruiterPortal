import { Component, OnInit } from '@angular/core';
import { EditApplicantInfoModel } from '../../applicant-info/edit-applicant-info/edit-applicant-info.model';
import { ReviewApplicantInfoService } from './review-applicant-info.service';

@Component({
    selector: 'app-review-applicant-info',
    templateUrl: './review-applicant-info.component.html',
    styleUrls: ['./review-applicant-info.component.css']
})
export class ReviewApplicantInfoComponent implements OnInit {
    public editApplicantInfoModel: EditApplicantInfoModel = new EditApplicantInfoModel();

    constructor(private applicantInfoService: ReviewApplicantInfoService) { }

    ngOnInit() {
        this.applicantInfoService.getApplicantInfo().subscribe(response => {
            if (response.status === 200) {
                this.editApplicantInfoModel = response.body[0] as EditApplicantInfoModel;
            }
        },
            err => {
                console.log(err);
            });
    }

    ValidSSNFormat(SSNValue: string) {
        if (SSNValue && SSNValue.length == 9) {
            return SSNValue.substr(0, 3) + "-" + SSNValue.substr(3, 2) + "-" + SSNValue.substr(5);
        }
        else {
            return SSNValue;
        }
    }

    getClientFormattedDate(value): string {
        if (value) {
            var dateObj = new Date(value);
            var month = dateObj.getUTCMonth() + 1;
            var day = dateObj.getUTCDate();
            var year = dateObj.getUTCFullYear();

            return month + "-" + day + "-" + year;
        }
        return '';
    }

}
