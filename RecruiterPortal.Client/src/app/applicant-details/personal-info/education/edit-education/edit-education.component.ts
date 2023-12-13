import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EditEducationService } from './edit-education.service';
import { EditEducationModel } from './edit-education.model';
import { CompareValidator } from '../../../../common/directives/compare-validator.directive';
import { forkJoin } from 'rxjs';
import { StorageService } from '../../../../common/services/storage.service';

@Component({
    selector: 'app-edit-education',
    templateUrl: './edit-education.component.html',
    styleUrls: ['./edit-education.component.css'],
    providers: [MessageService]
})
export class EditEducationComponent implements OnInit {
    public editEducationModel: EditEducationModel = new EditEducationModel();
    public editEducationFormGroup: FormGroup;
    public isLoading: boolean = false;
    public submitted: boolean = false;
    private userEducationId;
    institutionTypes: any[];
    yearArray: any[] = [];

    constructor(private editEducationService: EditEducationService, private fb: FormBuilder, private router: Router,
        private messageService: MessageService, private activeRoute: ActivatedRoute, private storageService: StorageService) {
        this.editEducationFormGroup = this.fb.group({
            schoolName: ['', Validators.compose([Validators.required, Validators.maxLength(500)])],
            schoolAddress: ['', Validators.compose([Validators.maxLength(500)])],
            fromDate: ['', [new CompareValidator('toDate', '<', 'true')]],
            toDate: ['', [new CompareValidator('fromDate', '>', 'true')]],
            degree: ['', Validators.compose([Validators.required, Validators.maxLength(200)])],
            isSchoolGraduate: ['', Validators.required],
            isntitutionType: ['', Validators.required]
        });
    }

    ngOnInit() {
        var currentYear = new Date().getFullYear();
        let array = new Array();
        for (var i = currentYear - 100; i <= currentYear; i++) {
            array.push(i);
        }
        this.yearArray = array;

        this.activeRoute.paramMap.subscribe(params => {
            this.userEducationId = params.get('id');            
            if (this.userEducationId != null) {
                forkJoin(
                    [this.editEducationService.getFacilityType(),
                    this.editEducationService.getEduInfo(this.userEducationId)]
                ).subscribe(data => {                    
                    if (data[0].status === 200) {
                        this.institutionTypes = data[0].body;
                    }
                    if (data[1].status === 200) {
                        this.editEducationModel = data[1].body as EditEducationModel;
                        this.editEducationFormGroup.setValue({
                            schoolName: this.checkNullOrUndefined(this.editEducationModel.SchoolName),
                            schoolAddress: this.checkNullOrUndefined(this.editEducationModel.SchoolAddress),
                            fromDate: this.checkNullOrUndefined(this.editEducationModel.FromDate),
                            toDate: this.checkNullOrUndefined(this.editEducationModel.ToDate),
                            degree: this.checkNullOrUndefined(this.editEducationModel.Degree),
                            isSchoolGraduate: this.setRadioButtonData(this.editEducationModel.IsGraduate),
                            isntitutionType: this.editEducationModel.InstitutionType,                            
                        });                        
                    }
                },
                    err => { this.isLoading = false; this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get education info', detail: '' }); },
                    () => { this.isLoading = false; });
            }
            else {
                this.editEducationService.getFacilityType()
                    .subscribe(data => {

                        if (data.status === 200) {
                            this.institutionTypes = data.body;
                        }
                    },
                        err => { this.isLoading = false; this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get education info', detail: '' }); },
                        () => { this.isLoading = false; });
            }
        });
    }

    onSubmit() {
        let educationModel = new EditEducationModel();
        educationModel.SchoolName = this.editEducationFormGroup.get('schoolName').value.trim();
        educationModel.SchoolAddress = this.editEducationFormGroup.get('schoolAddress').value.trim();
        educationModel.FromDate = this.editEducationFormGroup.get('fromDate').value;
        educationModel.ToDate = this.editEducationFormGroup.get('toDate').value;
        educationModel.Degree = this.editEducationFormGroup.get('degree').value.trim();
        educationModel.IsGraduate = this.getBooleanValue(this.editEducationFormGroup.get('isSchoolGraduate').value.trim());
        educationModel.ApplicantID = this.storageService.getApplicantId;
        educationModel.InstitutionType = +this.editEducationFormGroup.get('isntitutionType').value;        
        this.isLoading = true;

        if (this.userEducationId) {
            educationModel.EducationID = +this.userEducationId;
            this.editEducationService.updateEducation(educationModel)
                .subscribe(result => {
                    if (result.status === 200) {
                        this.router.navigate(['/personal-info/education']);
                        this.editEducationService.updateMessage("Successfully updated education info.");
                    }
                    else {
                        this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to update education info', detail: '' });
                    }
                },
                    err => { this.isLoading = false; this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to update education info', detail: '' }); },
                    () => { this.isLoading = false; })
        }
        else {
            this.editEducationService.insertEducation(educationModel)
                .subscribe(result => {
                    if (result.status === 200) {
                        this.editEducationService.updateMessage("Successfully added education info.");
                        this.router.navigate(['/personal-info/education']);
                    }
                    else {
                        this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to update education info', detail: '' });
                    }
                },
                    err => { this.isLoading = false; this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to update education info', detail: '' }); },
                    () => { this.isLoading = false; })
        }
    }

    getBooleanValue(value: string): boolean {
        return value.toLowerCase() === "yes" ? true : false;
    }

    checkNullOrUndefined(value) {
        if (value) {
            return value;
        }
        return '';
    }

    getClientFormattedDate(value): Date {
        if (value) {
            var dateParts = value.split("-");
            var dateObject = new Date(+dateParts[2], dateParts[0] - 1, +dateParts[1]);

            return dateObject;
        }
        return null;
    }

    setRadioButtonData(value) {
        if (value == undefined || value == null) {
            return ''
        }
        return value.toString() == 'true' ? "YES" : "NO";
    }

    onClear() {
        this.editEducationFormGroup.setValue({
            schoolName: '',
            schoolAddress: '',
            fromDate: '',
            toDate: '',
            degree: '',
            isSchoolGraduate: '',
            isntitutionType: ''
        });
    }
}
