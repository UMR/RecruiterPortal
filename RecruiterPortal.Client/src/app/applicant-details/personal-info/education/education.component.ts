import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { EditEducationService } from './edit-education/edit-education.service';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';


@Component({
    selector: 'app-education',
    templateUrl: './education.component.html',
    styleUrls: ['./education.component.css'],
    providers: [MessageService]
})
export class EducationComponent implements OnInit {
    public editEducationModels: any = [];
    public isLoading: boolean = true;
    public facilities: any[] = [];

    constructor(private editEducationService: EditEducationService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router) { }

    ngOnInit() {
        this.getFacilityType();
        this.getEdutions();
    }

    getFacilityType() {
        this.editEducationService.getFacilityType().subscribe(res => {
            if (res.status === 200) {
                this.facilities = res.body;                
            }
        })
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
                                    const educationObj = {...education, FacilityType: facilityName}
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

}
