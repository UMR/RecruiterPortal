import { Component, OnInit } from '@angular/core';
import { EditEducationService } from '../../education/edit-education/edit-education.service';

@Component({
  selector: 'app-review-education',
  templateUrl: './review-education.component.html',
  styleUrls: ['./review-education.component.css']
})
export class ReviewEducationComponent implements OnInit {

  public editEducationModels: any = [];  

  constructor(private editEducationService: EditEducationService) { }

  ngOnInit() {
    this.getData();

  }

  getData() {
    this.editEducationService.getEducationInfo().subscribe(data => {

      this.editEducationModels = data.body;
    },
      err => {
      },
      () => {
      });
  }
}
