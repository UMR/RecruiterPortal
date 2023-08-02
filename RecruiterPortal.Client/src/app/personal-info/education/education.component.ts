import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';

import { EditEducationService } from './edit-education/edit-education.service';
import { Router } from '@angular/router';
//import { EditEducationModel } from './edit-education/edit-education.model';

@Component({
    selector: 'app-education',
    templateUrl: './education.component.html',
    styleUrls: ['./education.component.css'],
    providers: [MessageService]
})
export class EducationComponent implements OnInit {
    //public editEducationModel: EditEducationModel = new EditEducationModel();
    public editEducationModels: any = [];
    public isLoading: boolean = true;

  constructor(private editEducationService: EditEducationService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

    ngOnInit() {
        this.getData();

    }

    getData() {
        this.editEducationService.getEducationInfo().subscribe(data => {
            
            this.editEducationModels = data.body;
        },
            err => { this.isLoading = false; this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get education info', detail: '' }); },
            () => { this.isLoading = false; });
    }

    getYearRange(fromDate, toDate) {
        let dateRange = "";
        if (fromDate && toDate) {
            let fd = fromDate.split("-");
            let td = toDate.split("-");
            dateRange = " (" + fd[2] + " - " + td[2] + ")";
        }
        return dateRange;
    }
    delete(id) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this record?',
            accept: () => {
                this.editEducationService.deleteEmpInfo(id)
                    .subscribe(data => {
                        this.isLoading = false;
                        this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Successfully delete', detail: '' });
                        this.editEducationModels = [];
                        this.getData();

                    },
                        err => {
                            this.isLoading = false;
                            this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to load', detail: '' });
                        },
                        () => {
                            this.isLoading = false;
                        });
            }
        });
  }

  prevPage() {
    this.router.navigate(['personal-info/physical-info/edit']);
  }

  nextPage() {
    this.router.navigate(['personal-info/employment']);
  }

}
