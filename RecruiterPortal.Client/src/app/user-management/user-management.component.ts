import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/components/table/table';
import { StorageService } from '../common/services/storage.service';
import { UserManagementService } from './user-management.service';
import { UserModel } from './user-model';

export enum EnumUserStatus {
  Active = 1,
  InActive = 0
}
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  public isLoading: boolean = false;
  public usersFormGroup: FormGroup;
  public submitted = false;
  public users: any[] = [];
  public totalUsers: number;
  public cols: any[];
  public rows: number = 20;
  public saveBtn: string = "Add";
  public displayModal: boolean = false;
  private existingUserActive: boolean = false;
  private existingUser: string = '';
  private _isDisabled: boolean = false;
  public selectedUser: any;
  public selectedUserStatus: any;
  private emailRegEx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  private onlyNumber = '^[0-9]*$';
  @ViewChild('userTable', { static: false }) userTable: Table;
  private agencyId: number;

  constructor(private fb: FormBuilder,
    private userManagementService: UserManagementService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService)
  {
    this.createViewUserFormGroup();
  }

  ngOnInit() {
    this.isLoading = true;
    this.cols = [
      { field: 'LoginId', header: 'User Login Id' },
      { field: 'FirstName', header: 'First Name' },
      { field: 'LastName', header: 'Last Name' },
      { field: 'Email', header: 'Email' },
    /*  { field: 'Password', header: 'Password' },*/
      { field: 'Telephone', header: 'Telephone' },
      { field: 'IsActive', header: 'Active Status' }
    ];
    this.getUsers();
  }

  createViewUserFormGroup() {
    this.usersFormGroup = this.fb.group({
      userLoginId: ['', Validators.required],
      userFirstName: ['', Validators.required],
      userLastName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.pattern(this.emailRegEx)]],
      userPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", Validators.required],
      userTelephone: ['', [Validators.required, Validators.pattern(this.onlyNumber)]],
      userStatus: [EnumUserStatus[EnumUserStatus.Active], Validators.required]
    }, {
      validator: this.MustMatch('userPassword', 'confirmPassword')
    });
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  get f() { return this.usersFormGroup.controls; }

  getAgencyByUserId() {
    this.isLoading = true;
    this.userManagementService.getAgencyByUserId()
      .subscribe(response => {
        if (response.status === 200) {
          this.agencyId = response.body.AgencyID;
        }
      },
        err => {
          console.log(err);
        },
        () => {
        });
  }

  getUsers() {
    this.isLoading = true;

    this.userManagementService.getUsersByAgencyId()
      .subscribe(response => {
        if (response.status === 200) {
          this.users = (response.body as any).users;
          this.users.forEach(value => {
            if (value.IsActive == true) { value.IsActive = "Active"; }
            else { value.IsActive = "Inactive"; }
          }); 
          this.totalUsers = (response.body as any).totalUsers;
        }
      },
        err => {
          this.isLoading = false;
          this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get users', detail: '' });
        },
        () => {
          this.isLoading = false;
        });
  }

  onAddNew() {
    this.usersFormGroup.reset();
    this.usersFormGroup.controls.userStatus.setValue(EnumUserStatus[EnumUserStatus.Active]);
    this.selectedUserStatus = EnumUserStatus.Active;
    this.saveBtn = "Add";
    this.displayModal = true;
    this.isDisabled(false);
  }

  showModalDialog() {
    this.displayModal = true;
  }

  onUserStatusChange(event) {
  }

  onUserApplicantTypeIDChange(event) {
  }

  onEdit(userModel: any) {
    console.log(userModel.IsActive)
    this.isDisabled(true);
    this.displayModal = true;
    this.existingUserActive = true;
    this.existingUser = userModel.LoginId;
    this.saveBtn = "Update";
    this.usersFormGroup.setValue({
      userLoginId: userModel.LoginId,
      userFirstName: userModel.FirstName,
      userLastName: userModel.LastName,
      userEmail: userModel.Email,
      userPassword: userModel.Password,
      confirmPassword: userModel.Password,
      userTelephone: userModel.Telephone,
      userStatus: userModel.IsActive
    });
  }

  onDelete(loginId: any) {
    this.confirmationService.confirm({
      message: `Are you sure to delete  <b>${loginId}</b>`,
      accept: () => {
        this.userManagementService.deleteUserById(loginId)
          .subscribe(response => {
            if (response.status === 200) {
              this.isLoading = false;
              this.messageService.add({ key: 'toastKey1', severity: 'success', summary: `User ${loginId} has been deleted.`, detail: '' });
              this.getUsers();
            }
          },
            err => {
              this.isLoading = false;
              this.messageService.add({ key: 'toastKey1', severity: 'error', summary: err.error.ExceptionMessage, detail: '' });
            },
            () => {
              this.isLoading = false;
            });
      }
    });
  }

  isDisabled(value: boolean) {
    this._isDisabled = value;
    if (this._isDisabled) {
      this.usersFormGroup.controls['userLoginId'].disable();
    } else {
      this.usersFormGroup.controls['userLoginId'].enable();
    }
  }

  onClose() {
    this.usersFormGroup.reset();
    this.usersFormGroup.controls.userStatus.setValue(EnumUserStatus[EnumUserStatus.Active]);
    this.selectedUserStatus = EnumUserStatus.Active;
    //this.userTable.reset();
    this.saveBtn = "Add";
    this.displayModal = false;
  }

  onClear() {
    this.usersFormGroup.reset();
    this.usersFormGroup.controls.userStatus.setValue(EnumUserStatus[EnumUserStatus.Active]);
    this.selectedUserStatus = EnumUserStatus.Active;
    if (this.existingUserActive) {
      this.usersFormGroup.controls.userLoginId.setValue(this.existingUser);
    }
    //this.userTable.reset();
    //this.saveBtn = "Add";
  }

  onSubmit() {
    this.isLoading = true; 
    this.submitted = true;
    if (!this.existingUserActive) {
      const userFormModel = new UserModel();
      userFormModel.LoginId = this.usersFormGroup.controls.userLoginId.value;
      userFormModel.FirstName = this.usersFormGroup.controls.userFirstName.value;
      userFormModel.LastName = this.usersFormGroup.controls.userLastName.value;
      userFormModel.Password = this.usersFormGroup.controls.userPassword.value;
      userFormModel.Email = this.usersFormGroup.controls.userEmail.value;
      userFormModel.Telephone = this.usersFormGroup.controls.userTelephone.value;
      userFormModel.ODAPermission = false;
      userFormModel.IsActive = this.usersFormGroup.controls.userStatus.value == "Active" ? true : false;
      userFormModel.TimeOut = 144000;
      userFormModel.AgencyID = this.agencyId;
      userFormModel.ApplicantTypeID = 1;

      this.userManagementService.addUser(userFormModel)
        .subscribe(result => {
          if (result.status === 200) {
            this.existingUserActive = false;
            this.onClose();
            this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Success', detail: 'User Added' });
            this.getUsers();
          }
          else {
            this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Error', detail: 'Failed to add user' });
          }
        },
          err => { this.isLoading = false; this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Error', detail: 'Failed to add user' }); },
        () => {
          this.isLoading = false;
      });
    }
    else {
      const userFormModel = new UserModel();
      userFormModel.LoginId = this.usersFormGroup.controls.userLoginId.value;
      userFormModel.FirstName = this.usersFormGroup.controls.userFirstName.value;
      userFormModel.LastName = this.usersFormGroup.controls.userLastName.value;
      userFormModel.Password = this.usersFormGroup.controls.userPassword.value;
      userFormModel.Email = this.usersFormGroup.controls.userEmail.value;
      userFormModel.Telephone = this.usersFormGroup.controls.userTelephone.value;
      userFormModel.ODAPermission = false;
      userFormModel.IsActive = this.usersFormGroup.controls.userStatus.value == "Active" ? true : false;
      userFormModel.TimeOut = 144000;
      userFormModel.AgencyID = this.agencyId;
      userFormModel.ApplicantTypeID = 1;

      this.userManagementService.editUser(userFormModel)
        .subscribe(result => {
          if (result.status === 200) {
            this.onClose();
            this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Success', detail: 'User Updated' });
            this.getUsers();
          }
          else {
            this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Error', detail: 'Failed to update user' });
          }
        },
          err => { this.isLoading = false; this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Error', detail: 'Failed to update user' }); },
        () => {
          this.isLoading = false;
       });
    }
  }

}
