import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ChangePasswordService } from './change-password.service';
import { AuthService } from '../common/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public isLoading: boolean = false;
  public chgPassForm: FormGroup;
  public submitted: boolean = false;
  public chngPassModel: ChangePasswordModel[] = [];

  constructor(private messageService: MessageService, private fb: FormBuilder, private chngPass: ChangePasswordService, private authService: AuthService) { }

  ngOnInit() {
    this.chgPassForm = this.fb.group({
      oldPassword: ["", Validators.required],
      newPassword: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", Validators.required],
    }, {
      validator: this.MustMatch('newPassword', 'confirmPassword')
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
  get f() { return this.chgPassForm.controls; }

  onChangeSubmit() {
    this.submitted = true;
    if (!this.chgPassForm.invalid) {
      this.isLoading = true;
      this.chngPassModel = [];
      this.chngPassModel.push({
        OldPassword: this.chgPassForm.get('oldPassword').value, NewPassword: this.chgPassForm.get('newPassword').value
      })
      this.chngPass.changePassword(this.chngPassModel[0])
        .subscribe(data => {
          if (data.status === 200) {
            this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Successfully password changed', detail: '' });
            this.submitted = false;
            this.chgPassForm.reset();
            this.authService.logout();
          }
        },
          err => {
            this.isLoading = false;
            if (err.error.includes('Password did not match')) {
              this.messageService.add({ key: 'toastKey1', severity: 'error', summary: "Error", detail: 'Old Password did not match' });
            }
            else {
              this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Password Change failed', detail: '' });
            }
          },
          () => {
            this.isLoading = false;
          });
    }
  }
}
