import { Component, OnInit } from '@angular/core';
import { ReviewPhysicalInfoService } from './review-physical-info.service';
import { StorageService } from '../../../common/services/storage.service';

@Component({
  selector: 'app-review-physical-info',
  templateUrl: './review-physical-info.component.html',
  styleUrls: ['./review-physical-info.component.css']
})
export class ReviewPhysicalInfoComponent implements OnInit {

  public userPhysical: any;  

  constructor(private physicalInfoService: ReviewPhysicalInfoService, private service: StorageService) { }

  ngOnInit() {
    this.getUserPhysicalInfo();
  }

  getUserPhysicalInfo() {    
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
          console.log(err);
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
