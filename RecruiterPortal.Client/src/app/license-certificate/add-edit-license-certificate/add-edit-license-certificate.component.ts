import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { LicenseCertificateService } from '../license-certificate.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EnumFileType } from 'src/app/upload-file/upload-file.model';
import { CompareValidator } from '../../common/directives/compare-validator.directive';

@Component({
  selector: 'app-add-edit-license-certificate',
  templateUrl: './add-edit-license-certificate.component.html',
  styleUrls: ['./add-edit-license-certificate.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class AddEditLicenseCertificateComponent implements OnInit {

  public isLoading: boolean = false;
  public licenseFormGroup: FormGroup;
  public userLicense: any = {};
  public licenseId: number;
  private licenseFile: string;
  public issuingAuthorityResults: string[];

  constructor(private fb: FormBuilder, private licenseService: LicenseCertificateService, private router: Router, private activeRoute: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.licenseId = +params.get('id');
        this.getUserLicenseById(this.licenseId);
      }
    });
    this.createLicenseForm();
  }

  onFileSelect(event) {
    if (event.files.length > 0) {
      if (!event.files[0].type.includes("image/") && !event.files[0].type.includes("application/pdf") && !event.files[0].type.includes("application/msword") && !event.files[0].type.includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
        this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Invalid file type', detail: 'Upload file' });
      } else if (event.files[0].size > 5000000) {
        this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Invalid file size', detail: 'File size limit: 5MB' });
      } else {
        this.licenseFormGroup.get('fileName').setValue(event.files[0].name);
        //console.log(event.files[0]);
        let reader = new FileReader();
        reader.readAsDataURL(event.files[0]);
        reader.onloadend = () => {
          this.licenseFile = reader.result.toString().split(',')[1];
        }
      }
    }
  }

  createLicenseForm() {
    this.licenseFormGroup = this.fb.group({
      licenseName: ['', [Validators.required, this.noWhitespaceValidator, Validators.maxLength(200)]],
      licenseNo: ['', [Validators.maxLength(50)]],
      fileName: [''],
      issueDate: ['', [new CompareValidator('expiryDate', '<', 'true')]],
      expiryDate: ['', [new CompareValidator('issueDate', '>', 'true')]],
      issuingAuthority: ['', Validators.maxLength(50)]
    });
  }

  noWhitespaceValidator(control: AbstractControl) {
    if (control && control.value && !control.value.replace(/\s/g, '').length) {
      control.setValue('');
    }
    return null;
  }

  getUserLicenseById(userLicenseId: number) {
    this.isLoading = true;
    this.licenseService.getUserLicenseById(userLicenseId)
      .subscribe(data => {
        if (data.status === 200) {
          this.userLicense = data.body;      
        }
        else {
          this.userLicense = {};
        }
      },
        err => {
          this.isLoading = false;
          this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get user license information', detail: '' });
        },
        () => {
          this.fillUserLicense();
          this.isLoading = false;
        });
  }

  fillUserLicense() {
    this.licenseFormGroup.setValue({
      licenseName: this.checkNullOrUndefined(this.userLicense.licenseName),
      licenseNo: this.checkNullOrUndefined(this.userLicense.licenseNo),
      issueDate: this.userLicense.issuedDate ? new Date(this.userLicense.issuedDate) : null,
      expiryDate: this.userLicense.expiryDate ? new Date(this.userLicense.expiryDate) : null,
      fileName: this.checkNullOrUndefined(this.userLicense.fileName),
      issuingAuthority: { issueAuthority: this.checkNullOrUndefined(this.userLicense.issueAuthority) }
    });
  }

  checkNullOrUndefined(value) {
    if (value) {
      return value;
    }
    return '';
  }

  onSave() {
    const model: any = {
      licenseID: this.userLicense.licenseID ? this.userLicense.licenseID : 0,
      licenseName: this.licenseFormGroup.get('licenseName').value,
      licenseNo: this.licenseFormGroup.get('licenseNo').value,
      expiryDate: this.licenseFormGroup.get('expiryDate').value ? this.licenseFormGroup.get('expiryDate').value.toLocaleString() : null,
      issuedDate: this.licenseFormGroup.get('issueDate').value ? this.licenseFormGroup.get('issueDate').value.toLocaleString() : null,
      fileData: this.licenseFile,
      fileName: this.licenseFormGroup.get('fileName').value,
      fileType: EnumFileType.CertificateLicense,
      issueAuthority: this.licenseFormGroup.get('issuingAuthority').value ? this.licenseFormGroup.get('issuingAuthority').value.issueAuthority : "",
      stateCode: ""
    };
    //console.log(model);
    if (this.licenseId) {
      this.isLoading = true;
      this.licenseService.update(model).subscribe(() => {
        this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'License information has been updated successfully', detail: '' });
      }, error => {
        this.isLoading = false;
        this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to update license information', detail: '' });
      },
        () => {
          this.isLoading = false;
          this.router.navigate(['/license-certificate']);
        });
    }
    else {
      this.isLoading = true;
      this.licenseService.save(model).subscribe(() => {
        this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'License information has been added successfully', detail: '' });
      }, error => {
        this.isLoading = false;
        this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to save license information', detail: '' });
      },
        () => {
          this.isLoading = false;
          this.router.navigate(['/license-certificate']);
        });
    }
  }

  onClear() {
    this.licenseFormGroup.get('licenseName').setValue('');
    this.licenseFormGroup.get('licenseNo').setValue('');
    this.licenseFormGroup.get('expiryDate').setValue('');
    this.licenseFormGroup.get('issueDate').setValue('');
    this.licenseFormGroup.get('fileName').setValue('');
  }

  onIssuingAuthoritySearch($event) {
    this.licenseService.getIssueingAuthorityByText($event.query).subscribe(data => {
      //console.log(data.body.data);
      this.issuingAuthorityResults = data.body.data;
    },
      err => { this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get Issuing Authority', detail: '' }); },
      () => { });
  }
}
