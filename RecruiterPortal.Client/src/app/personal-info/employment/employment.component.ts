import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { EmploymentService } from './employment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employment',
  templateUrl: './employment.component.html',
  styleUrls: ['./employment.component.css']
})
export class EmploymentComponent implements OnInit {
  public isLoading: boolean = false;
  public employments: any = [];
  public employmentsImported: any = [];

  constructor(private messageService: MessageService,
    private employmentService: EmploymentService,
    private confirmationService: ConfirmationService,
    private router: Router  ) {
  }

  ngOnInit() {
    this.getData();
    this.getImportedEmploymentHistoryData();
  }

  getData() {
    this.isLoading = true;
    this.employmentService.getEmpInfo()
      .subscribe(data => {        
        this.employments = data;
      },
        err => {
          this.isLoading = false;
          this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to load', detail: '' });
        },
        () => {
          this.isLoading = false;
        });
  }
  getImportedEmploymentHistoryData() {
    this.isLoading = true;
    this.employmentService.getImportedEmploymentHistory()
      .subscribe(data => {
        this.employmentsImported = data;
      },
        err => {
          this.isLoading = false;
          this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to load', detail: '' });
        },
        () => {
          this.isLoading = false;
        });
  }
  delete(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this record?',
      accept: () => {
        this.employmentService.deleteEmpInfo(id)
          .subscribe(data => {
            this.isLoading = false;
            this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Successfully delete', detail: '' });
            this.employments = [];
            this.getData();
            this.getImportedEmploymentHistoryData();

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
  deleteImportedEmployment(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this record?',
      accept: () => {
        this.employmentService.deleteImportedEmpInfo(id)
          .subscribe(data => {
            this.isLoading = false;
            this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Successfully delete', detail: '' });
            this.employments = [];
            this.getData();
            this.getImportedEmploymentHistoryData();

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

  prevPage() {
    this.router.navigate(['personal-info/education']);
  }

  nextPage() {
    this.router.navigate(['personal-info/military/edit']);
  }

}
