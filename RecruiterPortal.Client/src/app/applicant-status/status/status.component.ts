import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StatusService } from './status.service';

@Component({
    selector: 'app-status',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.css']    
})
export class StatusComponent implements OnInit {

    public formGroup: FormGroup;
    public positionResults: string[];
    public institutionResults: any[];
    constructor(private fb: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService, private statusService: StatusService) { }

    ngOnInit() {
        this.createFormGroup();
    }

    createFormGroup() {
        this.formGroup = this.fb.group({            
            position: ['', Validators.compose([Validators.required])],
            positionId: [''],
            institution: ['', Validators.compose([Validators.required])],
            instituteId: [''],            
        });
    }

    onPositionSearch($event) {
        this.statusService.getPositionByPositionName($event.query).subscribe(response => {
            this.positionResults = response.body;
        },
            err => { this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get positions', detail: '' }); },
            () => { });
    }

    onPositionSelect($event) {
        this.formGroup.patchValue({
            position: $event.PositionName,
            positionId: $event.Id
        });
    }

    onInstitutiionSearch($event) {
        this.statusService.getInsituteByInsituteName($event.query).subscribe(response => {
            if (response.status === 200) {
                this.institutionResults = response.body;
            }
        },
            err => { this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get institutes', detail: '' }); },
            () => { });
    }

    onInstitutiionSelect($event) {
        this.formGroup.patchValue({
            instituteId: $event.Id,
            institution: $event.InstituteName
        });
    }

    clear() {
        this.formGroup.reset();
    }

    hide() {
        
    }
}
