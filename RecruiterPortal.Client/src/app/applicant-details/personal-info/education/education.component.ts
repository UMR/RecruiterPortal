import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { EditEducationService } from './edit-education/edit-education.service';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
    selector: 'app-education',
    templateUrl: './education.component.html',
    styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit, OnDestroy  {
    public editEducationModels: any = [];
    public isLoading: boolean = true;
    public facilities: any[] = [];
    private unsubscribe$: Subject<any> = new Subject<any>();

    constructor(private editEducationService: EditEducationService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router) { }

    ngOnInit() {
        this.getFacilityType();
        this.getEdutions();
        this.getUpdateMessage();
        this.showMessage();
    }

    getFacilityType() {
        this.editEducationService.getFacilityType().subscribe(res => {
            if (res.status === 200) {
                this.facilities = res.body;
            }
        })
    }
    getUpdateMessage() {
         this.editEducationService.getMessage$.subscribe(msg => {
            if (msg) {
                this.messageService.add({ key: 'toastKey1', severity: 'success', summary: msg, detail: '' });
            }
        }, err => { },
            () => { });
    }
    showMessage() {
        setTimeout(() => {
            this.getUpdateMessage();
        }, 500);
    }

    getEdutions() {
        this.editEducationService.getEducationInfo().pipe(
            debounceTime(3000),
            distinctUntilChanged()).subscribe(data => {
                if (data.status === 200) {
                    const educationList = data.body;
                    if (educationList && educationList.length > 0) {
                        educationList.forEach((education) => {
                            if (this.facilities) {
                                const facility = this.facilities.find(item => +item.Value === +education.InstitutionType);
                                if (facility) {
                                    const facilityName = facility.Text;
                                    const educationObj = { ...education, FacilityType: facilityName }
                                    this.editEducationModels.push(educationObj);
                                }
                            }
                        });
                    }
                }
            },
                err => { this.isLoading = false; this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get education info', detail: '' }); },
                () => {
                    this.isLoading = false;
                });
    }

    getYearRange(fromDate, toDate) {
        let dateRange = "";
        if (fromDate && toDate) {
            let fd = fromDate.split("-");
            let td = toDate.split("-");
            dateRange = " (" + fd[2] + " - " + td[2] + ")";
        }
        return dateRange;
    }

    delete(id) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this record?',
            accept: () => {
                this.editEducationService.deleteEmpInfo(id)
                    .subscribe(data => {
                        this.isLoading = false;
                        this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Successfully deleted', detail: '' });
                        this.editEducationModels = [];
                        this.getEdutions();

                    },
                        err => {
                            this.isLoading = false;
                            this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to delete education', detail: '' });
                        },
                        () => {
                            this.isLoading = false;
                        });
            }
        });
    }

    prevPage() {
        this.router.navigate(['personal-info/physical-info/edit']);
    }

    nextPage() {
        this.router.navigate(['personal-info/employment']);
    }

    ngOnDestroy() {
        this.editEducationService.updateMessage('');
        //this.editEducationService.sendMessage$.unsubscribe();
    }
}
