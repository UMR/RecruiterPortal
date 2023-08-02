import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { StorageService } from '../../common/services/storage.service';
import { PhysicalInfoService } from './physical-info.service';

@Component({
  selector: 'app-physical-info',
  templateUrl: './physical-info.component.html',
  styleUrls: ['./physical-info.component.css']
})
export class PhysicalInfoComponent implements OnInit {

  public isLoading: boolean = false;
  public userPhysical: any;

  constructor(private messageService: MessageService, private physicalInfoService: PhysicalInfoService, private service: StorageService) { }

  ngOnInit() {
    this.getUserPhysicalInfo();
  }

  getUserPhysicalInfo() {
    this.isLoading = true;
    this.physicalInfoService.getPhysicalInfo(this.service.getApplicantId)
      .subscribe(data => {
        if (data.status === 200) {
          this.userPhysical = data.body;
        }
        else {
          this.userPhysical = {};
        }
      },
        err => {
          this.isLoading = false;
          this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get user physical information', detail: '' });
        },
        () => {
          this.isLoading = false;
        });
  }

  getHeight(heightInput: string) {
    if (heightInput) {
      let height = heightInput.replace("-", "");
      let feet = height.substring(0, 1);
      let inch = height.substring(1, height.length);
      return `${feet}-${inch}`;
    }

    return "";
  }
}
