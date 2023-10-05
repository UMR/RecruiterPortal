import { Component, OnInit } from '@angular/core';
import { RecruiterHistoryService } from './recruiter-history.service';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SearchModel } from './searchModel';

@Component({
    selector: 'app-recruiter-history',
    templateUrl: './recruiter-history.component.html',
    styleUrls: ['./recruiter-history.component.css']
})
export class RecruiterHistoryComponent implements OnInit {

    entryExits: any = [];
    public rows: number = 15;
    private take: number = 15;
    private skip: number = 0;
    private pageNumber: number;
    public totalInstitute: number;
    public searchFg: FormGroup;
    public maxDateValue: any = new Date();

    constructor(private fb: FormBuilder, private recruiterHistoryService: RecruiterHistoryService, private messageService: MessageService) { }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.searchFg = this.fb.group({
            fromDate: [""],
            toDate: [new Date(),]
        });
    }

    onLazyLoad(event: LazyLoadEvent) {
        this.pageNumber = Math.ceil((event.first + 1) / event.rows);
        this.take = event.rows;
        this.skip = event.rows * (this.pageNumber - 1);
        this.onSearchClick();
    }
    onSearchClick() {
        this.searchFg.controls.toDate.setValue(new Date());
        let searchModel = new SearchModel;
        console.log(this.searchFg.controls.toDate.value);
        searchModel.skip = this.skip;
        searchModel.take = this.take;
        searchModel.startTime = this.searchFg.controls.fromDate.value == null ? null : this.getUTCFormatedDate(this.searchFg.controls.fromDate.value);
        searchModel.endTime = this.searchFg.controls.toDate == null ? null : this.getUTCFormatedDate(this.searchFg.controls.toDate.value);
        console.log(searchModel);
        this.getEntryExit(searchModel);
    }
    onClear() {

    }

    getEntryExit(searchModel: SearchModel) {
        this.recruiterHistoryService.getRecruiterEntryExit(searchModel).subscribe(
            res => {
                if (res.status == 200) {
                    this.entryExits = res.body.Records;
                    this.totalInstitute = res.body.TotalRecords;
                }
                else {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to get entry exit', life: 3000 });
                }
            },
            err => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
            }
        );
    }

    getUTCFormatedDate(value): Date {
        if (value) {
            return new Date(Date.UTC(
                new Date(value).getFullYear(),
                new Date(value).getMonth(),
                new Date(value).getDate()));
        }
        //return new Date(value.getDay() + '/' + value.getMonth() + '/' + value.getFullYear());
        return null;
    }
}
