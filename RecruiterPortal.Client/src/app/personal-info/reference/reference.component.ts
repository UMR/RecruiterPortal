import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { StorageService } from '../../common/services/storage.service';
import { ReferenceService } from './reference.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.css']
})
export class ReferenceComponent implements OnInit {

  public isLoading: boolean = false;
  public userReferences: any = [];

  constructor(private referenceService: ReferenceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private service: StorageService,
    private router:Router) { }

  ngOnInit() {
    this.getAllUserReferenceByUserId();
  }

  getAllUserReferenceByUserId() {
    this.isLoading = true;
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
          this.isLoading = false;
          this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get user reference', detail: '' });
        },
        () => {
          this.isLoading = false;
        });
  }

  onDelete(userReferenceId: any) {
    if (userReferenceId) {
      this.confirmationService.confirm({
        message: "Are you sure that you want to delete this reference?",
        header: "Delete Confirmation",
        accept: () => {
          this.isLoading = true;
          this.referenceService.delete(userReferenceId).subscribe(
            data => {
              this.messageService.add({ key: 'toastKey1', severity: 'success', summary: ' User reference has been deleted successfully', detail: '' });
              const index = this.userReferences.findIndex(x => x.userReferenceID === userReferenceId);
              this.userReferences.splice(index, 1);
            },
            error => {
              this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to delete user reference', detail: '' });
            },
            () => {
              this.isLoading = false;
            }
          );
        }
      });
    }
  }

  getFullName(userReference) {
    if (userReference.RefMiddleName && userReference.RefLastName) {
      return userReference.RefFirstName + ' ' + userReference.RefMiddleName + ' ' + userReference.RefLastName;
    }
    if (!userReference.RefMiddleName && userReference.RefLastName) {
      return userReference.RefFirstName + ' ' + userReference.RefLastName;
    }
    if (userReference.RefMiddleName && !userReference.RefLastName) {
      return userReference.RefFirstName + ' ' + userReference.RefMiddleName;
    }
    else {
      return userReference.RefFirstName;
    }
  }

  prevPage() {
    this.router.navigate(['personal-info/military/edit']);
  }
  nextPage() {
    console.log("aaaaaaa")
    this.router.navigate(['personal-info/review']);
  }

}
