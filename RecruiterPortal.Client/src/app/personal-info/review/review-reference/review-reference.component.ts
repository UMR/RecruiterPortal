import { Component, OnInit } from '@angular/core';
import { ReferenceService } from '../../reference/reference.service';
import { StorageService } from '../../../common/services/storage.service';

@Component({
  selector: 'app-review-reference',
  templateUrl: './review-reference.component.html',
  styleUrls: ['./review-reference.component.css']
})
export class ReviewReferenceComponent implements OnInit {
  
  public userReferences: any = [];

  constructor(private referenceService: ReferenceService, private service: StorageService) { }

  ngOnInit() {
    this.getAllUserReferenceByUserId();
  }

  getAllUserReferenceByUserId() {    
    this.referenceService.getAllUserReferenceByUserId(this.service.getApplicantId)
      .subscribe(data => {
        if (data.status === 200) {
          this.userReferences = data.body;
        }
        else {
          this.userReferences = [];
        }
      },
        err => {
          console.log(err);           
        });
  }    

}
