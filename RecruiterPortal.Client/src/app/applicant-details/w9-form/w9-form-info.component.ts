import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { W9FormInfoService } from './w9-form-info.service';
import { StorageService } from '../../common/services/storage.service';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-w9-form-info',
    templateUrl: './w9-form-info.component.html',
    styleUrls: ['./w9-form-info.component.css']
})
export class W9FormInfoComponent implements OnInit {
    public isLoading: boolean = false;
    public name: string = "";
    public businessName: string = "";
    public companyLiability: string = "";
    public individualProprietor: string = "";
    public cCorporation: string = "";
    public sCorporation: string = "";
    public partnership: string = "";
    public trust: string = "";
    public other: string = "";
    public FATCACode: string = "";
    public stAddress: string = "";
    public aptNo: string = "";
    public zipCode: string = "";
    public state: string = "";
    public city: string = "";
    public accountNo: string = "";
    public requesterName: string = "";
    public ssn: string = "";
    public empIdNo: string = "";
    public payeeCode: string = "";
    public date: string = "";

    constructor(private messageService: MessageService, private fb: FormBuilder, private w9Service: W9FormInfoService, private service: StorageService) { }

    ngOnInit() {
        this.w9Service.getW9Info(this.service.getApplicantId)
            .subscribe(data => {
                if (data.status === 200 && data.body !== null) {
                    this.name = data.body.Name;
                    this.businessName = data.body.BusinessName;
                    this.companyLiability = data.body.CompanyLiability == true ? 'Yes' : 'No';
                    this.individualProprietor = data.body.IndividualProprietor == true ? 'Yes' : 'No';
                    this.cCorporation = data.body.CCorporation == true ? 'Yes' : 'No';
                    this.sCorporation = data.body.SCorporation == true ? 'Yes' : 'No';
                    this.partnership = data.body.Partnership == true ? 'Yes' : 'No';
                    this.trust = data.body.Trust == true ? 'Yes' : 'No';
                    this.other = data.body.Other == true ? 'Yes' : 'No';
                    this.FATCACode = data.body.ReportingCode;
                    this.stAddress = data.body.StreetAddress;
                    this.aptNo = data.body.AptNo;
                    this.zipCode = data.body.ZipCode;
                    this.state = data.body.StateName;
                    this.city = data.body.City;
                    this.accountNo = data.body.AccountNumber;
                    this.requesterName = data.body.RequesterNameAddress;
                    this.ssn = data.body.SSN;
                    this.empIdNo = data.body.EmployerIdNo;
                    this.payeeCode = data.body.PayeeCode;
                    this.date = data.body.Date
                }
            },
                err => {
                    console.log(err);
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get CBC info', detail: '' });
                },
                () => { this.isLoading = false; });
    }

    onDownloadClick() {
        this.isLoading = true;
        this.w9Service.getW9FileByApplicantId(this.service.getApplicantId)
            .subscribe((response: HttpResponse<Blob>) => {                
                if (response.status === 200) {
                    let filename: string = this.getFileName(response)                    
                    let binaryData = [];
                    binaryData.push(response.body);
                    let downloadLink = document.createElement('a');
                    downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: 'blob' }));
                    downloadLink.setAttribute('download', filename.trim().replace('"', '').replace('"', ''));                    
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get Employment Application file', detail: '' });
                },
                () => {
                    this.isLoading = false;
                });
    }

    getFileName(response: HttpResponse<Blob>) {
        let filename: string;
        try {
            const contentDisposition = response.headers.get('content-disposition');
            console.log(contentDisposition);
            filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
        }
        catch (e) {
            console.log(e);
            filename = 'myfile.pdf'
        }
        return filename
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
}
