import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MessageService, ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { PositionListService } from './position-list.service';
import { positionListValidator } from './position-list.validator';

@Component({
    selector: 'app-position-list',
    templateUrl: './position-list.component.html',
    styleUrls: ['./position-list.component.css']
})
export class PositionListComponent implements OnInit {

    public isLoading: boolean = false;
    public positions: any[] = [];
    public totalPosition: number;
    public selectedPositionId: number;
    public selectedPosition: any;
    public cols: any[];
    public rows: number = 15;
    private pageNumber: number;
    private pageSize: number;

    public showDialog: boolean = false;
    public addEditTitle: string;
    public addEditButtonTitle: string;
    public formGroup: FormGroup;
    public searchFormGroup: FormGroup;
    public positionResults: string[];

    constructor(private fb: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService, private positionService: PositionListService) {
        this.addEditTitle = "Add";
        this.addEditButtonTitle = "Save";
        this.selectedPositionId = 0;
    }

    ngOnInit() {
        this.createSearchFormGroup();
        this.createFormGroup();
    }

    createSearchFormGroup() {
        this.searchFormGroup = this.fb.group({
            searchPosition: [""],
            searchPositionId: [""]
        });
    }

    createFormGroup() {
        this.formGroup = this.fb.group({
            positionName: ['',
                {
                    validators: [Validators.required, Validators.maxLength(200), this.noWhitespaceValidator],
                    asyncValidators: [positionListValidator(this.positionService)],
                    updateOn: 'change',
                },
            ],
        });
    }

    setDefaultFields(isLoading: boolean, showDialog: boolean, selectedPositionId: number, selectedPosition: any, addEditTitle: string, addEditButtonTitle: string) {
        this.isLoading = isLoading;
        this.showDialog = showDialog;
        this.selectedPositionId = selectedPositionId;
        this.selectedPosition = selectedPosition;
        this.formGroup.reset();
        this.addEditTitle = addEditTitle;
        this.addEditButtonTitle = addEditButtonTitle;
    }

    noWhitespaceValidator(control: AbstractControl) {
        if (control && control.value && !control.value.replace(/\s/g, '').length) {
            control.setValue('');
        }
        return null;
    }

    onPositionSearch($event) {
        this.positionService.getPositionByPositionName($event.query).subscribe(response => {
            this.positionResults = response.body;
        },
            err => { this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get positions', detail: '' }); },
            () => { });
    }

    onPositionSelect($event) {        
        this.searchFormGroup.patchValue({
            searchPosition: $event.PositionName,
            searchPositionId: $event.Id
        });
    }

    onSearchClear() {
        this.searchFormGroup.reset();
        this.getPositions();
    }

    onSearchClick() {             
        this.getPositions();
    }

    getPositions() {
        this.isLoading = true;
        const positionId = this.searchFormGroup.controls.searchPositionId.value ? this.searchFormGroup.controls.searchPositionId.value : '';
        this.positionService.getPositions(this.pageNumber, this.pageSize, positionId)
            .subscribe(response => {
                if (response.status === 200) {
                    this.positions = response.body.Records;
                    this.totalPosition = response.body.TotalRecords;
                }
            },
                err => {
                    this.isLoading = false;
                    this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get positions', detail: '' });
                },
                () => {
                    this.isLoading = false;
                });
    }

    onLazyLoadPositions(event: LazyLoadEvent) {
        this.pageNumber = Math.ceil((event.first + 1) / event.rows);
        this.pageSize = event.rows;
        this.getPositions();
    }

    fillupPosition(position: any) {
        this.formGroup.patchValue({
            positionName: position.PositionName
        });
    }

    hideModal() {
        this.setDefaultFields(false, false, 0, null, "Add", "Save");
    }

    onNew() {
        this.setDefaultFields(false, true, 0, null, "Add", "Save");
    }

    onEdit(position) {
        this.setDefaultFields(false, true, position.Id, position, "Edit", "Update");
        this.fillupPosition(position);
        this.formGroup.controls.positionName.setAsyncValidators([positionListValidator(this.positionService, this.selectedPositionId)]);
        this.formGroup.controls.positionName.updateValueAndValidity();
    }

    onClear() {
        this.formGroup.reset();
    }

    onHide() {
        this.showDialog = false;
    }

    onSave() {
        const model: any = {
            Id: this.selectedPositionId,
            PositionName: this.formGroup.controls.positionName.value
        };
        this.isLoading = true;
        if (this.selectedPositionId == 0) {
            this.positionService.savePosition(model)
                .subscribe(result => {
                    if (result.status === 200) {
                        this.setDefaultFields(false, false, 0, null, "Add", "Save");
                        this.getPositions();
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Position saved successfully', life: 3000 });
                    }
                },
                    err => {
                        this.isLoading = false;
                        this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to save position', detail: '' });
                    });
        } else {
            this.positionService.updatePosition(model)
                .subscribe(result => {
                    if (result.status === 200) {
                        this.setDefaultFields(false, false, 0, null, "Add", "Save");
                        this.getPositions();
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Position updated successfully', life: 3000 });
                    }
                },
                    err => {
                        this.isLoading = false;
                        this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to update position', detail: '' });
                    });
        }
    }

    onDelete(position) {
        this.confirmationService.confirm({
            message: `Are you sure you want to delete ${position.PositionName} position?`,
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.isLoading = true;
                this.positionService.deletePosition(position.Id).subscribe(res => {
                    if (res.status === 200) {
                        this.setDefaultFields(false, false, 0, null, "Add", "Save");
                        this.searchFormGroup.reset();
                        this.getPositions();
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Position deleted successfully', life: 3000 });
                    }
                },
                    err => {
                        this.isLoading = false;
                        this.messageService.add({ key: 'toastKey1', severity: 'error', detail: 'Failed to delete position', life: 3000 });
                    }
                );
            }
        });
    }

}
