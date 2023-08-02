import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { StorageService } from '../../common/services/storage.service';
import { MilitaryService } from './military.service';

@Component({
  selector: 'app-military',
  templateUrl: './military.component.html',
  styleUrls: ['./military.component.css']
})
export class MilitaryComponent implements OnInit {

  public isLoading: boolean = false;
  public userMilitary: any;
  public dischargeType: string = "";

  constructor(private messageService: MessageService, private militaryService: MilitaryService, private service: StorageService) { }

  ngOnInit() {
    this.getUserMilitary();
  }

  getUserMilitary() {
    this.isLoading = true;
    this.militaryService.getUserMilitary(this.service.getApplicantId)
      .subscribe(data => {
        if (data.status === 200) {
          this.userMilitary = data.body;
          this.getDischargeType(this.userMilitary);
        }
        else {
          this.userMilitary = {};
        }
      },
        err => {
          this.isLoading = false;
          this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get user military information', detail: '' });
        },
        () => {
          this.isLoading = false;
        });
  }

  getDischargeType(userMilitary) {
    if (userMilitary) {
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
}
