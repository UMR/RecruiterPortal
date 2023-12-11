import { Component, OnInit, Input } from '@angular/core';
import { MilitaryService } from '../../military/military.service';
import { StorageService } from '../../../../common/services/storage.service';

@Component({
    selector: 'app-review-military',
    templateUrl: './review-military.component.html',
    styleUrls: ['./review-military.component.css']
})
export class ReviewMilitaryComponent implements OnInit {
    public noUserMilitary: boolean = false;
    public userMilitary: any;
    public dischargeType: any;

    constructor(private militaryService: MilitaryService, private service: StorageService) { }

    ngOnInit() {
        this.getUserMilitary();
    }

    getUserMilitary() {
        this.militaryService.getUserMilitary(this.service.getApplicantId)
            .subscribe(data => {
                if (data.status === 200) {
                    if (data.body.Branch == "") {
                        this.noUserMilitary = false;
                    }
                    else {
                        this.noUserMilitary = true;
                    }
                    this.userMilitary = data.body;
                    this.getDischargeType(this.userMilitary);
                }
                else {
                    this.noUserMilitary = false;
                    this.userMilitary = {};
                }
            },
                err => {
                    console.log(err);
                });
    }

    getDischargeType(userMilitary) {
        if (userMilitary.DischargeType === 1) {
            this.dischargeType = "Honorable";
        }
        else if (userMilitary.DischargeType === 0) {
            this.dischargeType = "Dishonorable";
        }
        else {
            this.dischargeType = "";
        }
    }

}
