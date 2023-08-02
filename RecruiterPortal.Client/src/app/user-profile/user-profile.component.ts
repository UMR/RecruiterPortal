import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { UserProfileService } from './user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public isLoading: boolean = false;
  public userFormGroup: FormGroup;
  public user: any = {};
  private obsEmail: Subscription;

  constructor(private fb: FormBuilder,
    private messageService: MessageService,
    private userProfileService: UserProfileService,
    private router: Router) {
    this.createUserFormGroup();
  }

  ngOnInit() {
    this.getUserByUserId();
    this.obsEmail = this.userFormGroup.controls.email.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => {
        if (data) {
          this.isLoading = true;
          this.userProfileService.isEmailExist(data)
            .subscribe(respone => {              
              if (respone.body === true) {
                this.userFormGroup.controls.email.setErrors({ 'invalid': true });;
                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Error', detail: 'Email is already in use' });
              }
            },
              err => {
                this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Error', detail: 'Failed to check duplicate email' });
              },
              () => {
                this.isLoading = false;
              });
        }
      });
  }

  createUserFormGroup() {
    this.userFormGroup = this.fb.group({
      loginId: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.maxLength(50)]],
      telephone: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  getUserByUserId() {
    this.isLoading = true;
    this.userProfileService.getUserByUserId()
      .subscribe(response => {
        if (response.status === 200) {
          this.user = response.body;
        }
      },
        err => {
          this.isLoading = false;
          this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Error', detail: 'Failed to get user' });
        },
        () => {
          this.fillUpUser();
          this.isLoading = false;
        });
  }

  fillUpUser() {
    this.userFormGroup.controls.loginId.setValue(this.user.LoginId);
    this.userFormGroup.controls.lastName.setValue(this.user.LastName);
    this.userFormGroup.controls.firstName.setValue(this.user.FirstName);
    this.userFormGroup.controls.email.setValue(this.user.Email);
    this.userFormGroup.controls.telephone.setValue(this.user.Telephone);
  }

  checkDuplicateEmail() {
    if (this.userFormGroup.controls.email.value) {
      this.isLoading = true;
      this.userProfileService.isEmailExist(this.userFormGroup.controls.email.value.trim())        
        .subscribe(respone => {          
          if (respone.body === true) {
            this.userFormGroup.controls.email.setErrors({ 'invalid': true });;
            this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Error', detail: 'Email is already in use' });
          }
        },
          err => {
            this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Error', detail: 'Failed to check duplicate email' });
          },
          () => {
            this.isLoading = false;
          });
    }
  }

  onSubmit() {
    this.isLoading = true;
    const userModel = {
      loginId: this.userFormGroup.controls.loginId.value,
      lastName: this.userFormGroup.controls.lastName.value.trim(),
      firstName: this.userFormGroup.controls.firstName.value.trim(),
      email: this.userFormGroup.controls.email.value.trim(),
      telephone: this.userFormGroup.controls.telephone.value.trim()
    };

    this.userProfileService.updateUserProfile(userModel)
      .subscribe(response => {
        if (response.status === 200) {
          this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Success', detail: 'User Profile Updated' });
          let username = `${this.userFormGroup.controls.lastName.value.trim()} ${this.userFormGroup.controls.firstName.value.trim()}`;
          this.userProfileService.setUsername(username);          
        }
      },
        err => {
          this.isLoading = false;
          this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Error', detail: 'Failed to update user profile' });
        },
        () => {
          this.isLoading = false;                  
        });
  }

  onClear() {
    this.userFormGroup.controls.lastName.setValue('');
    this.userFormGroup.controls.firstName.setValue('');
    this.userFormGroup.controls.email.setValue('');
    this.userFormGroup.controls.telephone.setValue('');
  }

  onBack() {
    this.router.navigate(['view-by-applicant']);
  }

  ngOnDestroy() {
    this.obsEmail.unsubscribe();
  }

}
