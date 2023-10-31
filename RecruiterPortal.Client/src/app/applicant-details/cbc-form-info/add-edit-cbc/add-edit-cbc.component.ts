import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AddEditCBCService } from './add-edit-cbc.service';
import { AddEditCBCModel } from './add-edit-cbc.model';
import { CompareValidator } from '../../../common/directives/compare-validator.directive';
import { forkJoin } from 'rxjs';
import { SelectItem } from 'primeng/primeng';
import { StorageService } from '../../../common/services/storage.service';

@Component({
    selector: 'app-add-edit-cbc',
    templateUrl: './add-edit-cbc.component.html',
    styleUrls: ['./add-edit-cbc.component.css'],
    providers: [MessageService]
})
export class AddEditCBCComponent implements OnInit {
    public editcbcModel: AddEditCBCModel = new AddEditCBCModel();
    public addEditCBCFormGroup: FormGroup;
    public isLoading: boolean = false;
    public submitted: boolean = false;
    private userEducationId;
    public zipCodeResults: string[];
    institutionTypes: any[];
    yearArray: any[] = [];
    cbcid: string = "";

    constructor(private addEditCBCService: AddEditCBCService, private fb: FormBuilder, private router: Router,
        private messageService: MessageService, private activeRoute: ActivatedRoute, private service: StorageService) {
        this.addEditCBCFormGroup = this.fb.group({
            agencyIdentification: [''],
            pfi: [{ value: '', disabled: true }],
            license: [{ value: '', disabled: true }],
            agencyName: [''],
            agFirstName: [''],
            agLastName: [''],
            streetNo: [''],
            streetName: [''],
            agApt: [''],
            agZipCode: [''],
            agCity: [''],
            agState: [''],
            agTelephone: [''],
            agEmail: [''],
            agDate: [''],
            fpMethod: [''],
            locationFPService: [''],
            identification: [''],
            fpStAddress: [''],
            fpZipCode: [''],
            fpCity: [''],
            fpState: [''],
            fpTitle: [''],
            fpFirstName: [''],
            fpLastName: [''],
            fpSignature: [''],
            fbDate: [''],
            motherMaidenName: [''],
            alias: [''],
            guardianSign: [''],
            homePhone: [''],
            title: ['']
        });
    }

    ngOnInit() {
        this.addEditCBCService.getCBCInfo(this.service.getApplicantId)
            .subscribe(data => {
                if (data.status === 200 && data.body !== null) {
                    this.cbcid = data.body.CBCID;
                    this.addEditCBCFormGroup.setValue({
                        agencyIdentification: data.body.AgencyIdentification,
                        pfi: data.body.LTHHPPFI,
                        license: data.body.LHCSALicense,
                        agencyName: data.body.AgencyName,
                        agFirstName: data.body.APFirstName,
                        agLastName: data.body.APLastName,
                        streetNo: data.body.AStreetNo,
                        streetName: data.body.AStreetName,
                        agApt: data.body.AApt,
                        agZipCode: { ZipCode: data.body.AZipCode },
                        agCity: data.body.ACity,
                        agState: data.body.AState,
                        agTelephone: data.body.ATelephoneNo,
                        agEmail: data.body.AEmail,
                        agDate: data.body.ADate ? new Date(data.body.ADate) : null,
                        fpMethod: data.body.FingerprintingMethod,
                        locationFPService: data.body.FingerprintServicesName,
                        identification: data.body.FIdentificationVerified,
                        fpStAddress: data.body.FStAddress,
                        fpZipCode: { ZipCode: data.body.FZip },
                        fpCity: data.body.FCity,
                        fpState: data.body.FState,
                        fpTitle: data.body.FTitle,
                        fpFirstName: data.body.FFirstName,
                        fpLastName: data.body.FLastName,
                        fpSignature: data.body.Signature,
                        fbDate: data.body.DateFingerPrinted ? new Date(data.body.DateFingerPrinted) : null,
                        motherMaidenName: data.body.MotherMaidenName,
                        alias: data.body.AliasAKA,
                        guardianSign: data.body.ParentorLegalGuardian,
                        homePhone: data.body.HomePhone,
                        title: data.body.Title
                    });
                    this.pfiLicenseEnableDisable(data.body.AgencyIdentification, data.body.LTHHPPFI, data.body.LHCSALicense);
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get CBC info', detail: '' });
                },
                () => { this.isLoading = false; });
    }

    onAgencyIdentityChange($event) {
        if ($event.target.value === 'LHCSA') {
            this.pfiLicenseEnableDisable('LHCSA', '', '');
        }
        else if ($event.target.value === 'LTHHCP') {
            this.pfiLicenseEnableDisable('LTHHCP', '', '');
        }
        else {
            this.pfiLicenseEnableDisable('', '', '');
        }
    }

    pfiLicenseEnableDisable(value, pfi, license) {
        if (value == 'LHCSA') {
            this.addEditCBCFormGroup.patchValue({ pfi: pfi });
            this.addEditCBCFormGroup.patchValue({ license: license });
            this.addEditCBCFormGroup.controls['pfi'].disable();
            this.addEditCBCFormGroup.controls['license'].enable();
        }
        else if (value == 'LTHHCP') {
            this.addEditCBCFormGroup.patchValue({ pfi: pfi });
            this.addEditCBCFormGroup.patchValue({ license: license });
            this.addEditCBCFormGroup.controls['license'].disable();
            this.addEditCBCFormGroup.controls['pfi'].enable();
        }
        else {
            this.addEditCBCFormGroup.patchValue({ pfi: pfi });
            this.addEditCBCFormGroup.patchValue({ license: license });
            this.addEditCBCFormGroup.controls['license'].disable();
            this.addEditCBCFormGroup.controls['pfi'].disable();
        }
    }

    onSubmit() {

        if (this.cbcid == "" && this.isEmpty()) {
            this.messageService.add({ key: 'toastKey1', severity: 'warn', summary: 'Please fill at least one field', detail: '' });
            return;
        }
        const cbcModel = new AddEditCBCModel();
        if (this.cbcid != "") {
            cbcModel.CBCID = this.cbcid;
        }
        cbcModel.UserID = this.service.getApplicantId.toString();
        cbcModel.AgencyIdentification = this.addEditCBCFormGroup.get('agencyIdentification').value;
        cbcModel.LTHHPPFI = this.addEditCBCFormGroup.get('pfi').value;
        cbcModel.LHCSALicense = this.addEditCBCFormGroup.get('license').value;
        cbcModel.AgencyName = this.addEditCBCFormGroup.get('agencyName').value;
        cbcModel.APFirstName = this.addEditCBCFormGroup.get('agFirstName').value;
        cbcModel.APLastName = this.addEditCBCFormGroup.get('agLastName').value;
        cbcModel.AStreetNo = this.addEditCBCFormGroup.get('streetNo').value;
        cbcModel.AStreetName = this.addEditCBCFormGroup.get('streetName').value;
        cbcModel.AApt = this.addEditCBCFormGroup.get('agApt').value;
        cbcModel.AZipCode = this.addEditCBCFormGroup.get('agZipCode').value ? this.addEditCBCFormGroup.get('agZipCode').value.ZipCode : "";
        cbcModel.ACity = this.addEditCBCFormGroup.get('agCity').value;
        cbcModel.AState = this.addEditCBCFormGroup.get('agState').value;
        cbcModel.ATelephoneNo = this.addEditCBCFormGroup.get('agTelephone').value;
        cbcModel.AEmail = this.addEditCBCFormGroup.get('agEmail').value;
        cbcModel.ADate = this.addEditCBCFormGroup.get('agDate').value ? this.getUTCFormatedDate(this.addEditCBCFormGroup.get('agDate').value) : Date;
        cbcModel.FingerprintingMethod = this.addEditCBCFormGroup.get('fpMethod').value;
        cbcModel.FingerprintServicesName = this.addEditCBCFormGroup.get('locationFPService').value;
        cbcModel.FIdentificationVerified = this.addEditCBCFormGroup.get('identification').value;
        cbcModel.FStAddress = this.addEditCBCFormGroup.get('fpStAddress').value;
        cbcModel.FZip = this.addEditCBCFormGroup.get('fpZipCode').value ? this.addEditCBCFormGroup.get('fpZipCode').value.ZipCode : "";
        cbcModel.FCity = this.addEditCBCFormGroup.get('fpCity').value;
        cbcModel.FState = this.addEditCBCFormGroup.get('fpState').value;
        cbcModel.FTitle = this.addEditCBCFormGroup.get('fpTitle').value;
        cbcModel.FFirstName = this.addEditCBCFormGroup.get('fpFirstName').value;
        cbcModel.FLastName = this.addEditCBCFormGroup.get('fpLastName').value;
        cbcModel.Signature = this.addEditCBCFormGroup.get('fpSignature').value;
        cbcModel.DateFingerPrinted = this.addEditCBCFormGroup.get('fbDate').value ? this.getUTCFormatedDate(this.addEditCBCFormGroup.get('fbDate').value) : Date;;
        cbcModel.MotherMaidenName = this.addEditCBCFormGroup.get('motherMaidenName').value;
        cbcModel.AliasAKA = this.addEditCBCFormGroup.get('alias').value;
        cbcModel.ParentorLegalGuardian = this.addEditCBCFormGroup.get('guardianSign').value;
        cbcModel.HomePhone = this.addEditCBCFormGroup.get('homePhone').value;
        cbcModel.Title = this.addEditCBCFormGroup.get('title').value;

        console.log(cbcModel);

        this.isLoading = true;
        this.addEditCBCService.saveCBCInfo(cbcModel)
            .subscribe(result => {
                if (result.status === 200) {
                    this.router.navigate(['/cbc-form-info/']);
                }
                else {
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to update CBC info', detail: '' });
                }
            },
                err => { this.isLoading = false; this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to update CBC info', detail: '' }); },
                () => { this.isLoading = false; })
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
    getUTCFormatedDate(value): Date {
        if (value) {
            return new Date(Date.UTC(
                new Date(value).getFullYear(),
                new Date(value).getMonth(),
                new Date(value).getDate()));
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
        this.addEditCBCFormGroup.setValue({
            agencyIdentification: '',
            pfi: '',
            license: '',
            agencyName: '',
            agFirstName: '',
            agLastName: '',
            streetNo: '',
            streetName: '',
            agApt: '',
            agZipCode: '',
            agCity: '',
            agState: '',
            agTelephone: '',
            agEmail: '',
            agDate: '',
            fpMethod: '',
            locationFPService: '',
            identification: '',
            fpStAddress: '',
            fpZipCode: '',
            fpCity: '',
            fpState: '',
            fpTitle: '',
            fpFirstName: '',
            fpLastName: '',
            fpSignature: '',
            fbDate: '',
            motherMaidenName: '',
            alias: '',
            guardianSign: '',
            homePhone: '',
            title: ''
        });
    }
    onZipCodeSearch($event) {
        this.addEditCBCService.getZipCodeCityStateByZipCode($event.query).subscribe(data => {
            this.zipCodeResults = data.body;
        },
            err => { this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get zip code', detail: '' }); },
            () => { });
    }
    onAgencyZipCodeSelect($event) {
        this.addEditCBCFormGroup.patchValue({
            agCity: $event.City,
            agState: $event.StateName
        });
    }
    onFpZipCodeSelect($event) {
        this.addEditCBCFormGroup.patchValue({
            fpCity: $event.City,
            fpState: $event.StateName
        });
    }
    isEmpty(): boolean {
        let isEmpty: boolean = true;
        if (this.addEditCBCFormGroup.get('agencyIdentification').value) {
            isEmpty = false;
        }
        if (this.addEditCBCFormGroup.get('pfi').value) {
            isEmpty = false;
        }
        if (this.addEditCBCFormGroup.get('license').value) {
            isEmpty = false;
        }
        if (this.addEditCBCFormGroup.get('agencyName').value) {
            isEmpty = false;
        }
        if (this.addEditCBCFormGroup.get('agFirstName').value) {
            isEmpty = false;
        }
        if (this.addEditCBCFormGroup.get('agLastName').value) {
            isEmpty = false;
        }
        if (this.addEditCBCFormGroup.get('streetNo').value) {
            isEmpty = false;
        }
        if (this.addEditCBCFormGroup.get('streetName').value) {
            isEmpty = false;
        }
        if (this.addEditCBCFormGroup.get('agApt').value) {
            isEmpty = false;
        }
        if (this.addEditCBCFormGroup.get('agZipCode').value) {
            isEmpty = false;
        }
        if (this.addEditCBCFormGroup.get('agCity').value) {
            isEmpty = false;
        }
        if (this.addEditCBCFormGroup.get('agState').value) {
            isEmpty = false;
        }
        if (this.addEditCBCFormGroup.get('agTelephone').value) {
            isEmpty = false;
        }
        if (this.addEditCBCFormGroup.get('agEmail').value) {
            isEmpty = false;
        }
        if (this.addEditCBCFormGroup.get('agDate').value) {
            isEmpty = false;
        }
        if (this.addEditCBCFormGroup.get('fpMethod').value) {
            isEmpty = false;
        }
        if (this.addEditCBCFormGroup.get('locationFPService').value) {
            isEmpty = false;
        }
        if (this.addEditCBCFormGroup.get('identification').value) {
            isEmpty = false;
        }
        if (this.addEditCBCFormGroup.get('fpStAddress').value) {
            isEmpty = false;
        }
        if (this.addEditCBCFormGroup.get('fpZipCode').value) {
            isEmpty = false;
        }
        if (this.addEditCBCFormGroup.get('fpCity').value) {
            isEmpty = false;
        }
        if (this.addEditCBCFormGroup.get('fpState').value) {
            isEmpty = false;
        }
        if (this.addEditCBCFormGroup.get('fpTitle').value) {
            isEmpty = false;
        }
        if (this.addEditCBCFormGroup.get('fpFirstName').value) {
            isEmpty = false;
        }
        if (this.addEditCBCFormGroup.get('fpLastName').value) {
            isEmpty = false;
        }
        if (this.addEditCBCFormGroup.get('fpSignature').value) {
            isEmpty = false;
        }
        if (this.addEditCBCFormGroup.get('fbDate').value) {
            isEmpty = false;
        }
        if (this.addEditCBCFormGroup.get('motherMaidenName').value) {
            isEmpty = false;
        }
        if (this.addEditCBCFormGroup.get('alias').value) {
            isEmpty = false;
        }
        if (this.addEditCBCFormGroup.get('guardianSign').value) {
            isEmpty = false;
        }
        if (this.addEditCBCFormGroup.get('homePhone').value) {
            isEmpty = false;
        }
        if (this.addEditCBCFormGroup.get('title').value) {
            isEmpty = false;
        }
        return isEmpty;
    }
}
