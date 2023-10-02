import { Component, OnInit } from '@angular/core';
import { RecruiterHistoryService } from './recruiter-history.service';
import { LazyLoadEvent } from 'primeng/api';

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

    constructor(private recruiterHistoryService: RecruiterHistoryService) { }

    ngOnInit() {
        this.getEntryExit()
    }

    onLazyLoad(event: LazyLoadEvent) {
        this.pageNumber = Math.ceil((event.first + 1) / event.rows);
        this.take = event.rows;
        this.skip = event.rows * (this.pageNumber - 1);
        this.getEntryExit();
    }

    getEntryExit() {
        this.recruiterHistoryService.getRecruiterEntryExit(this.take, this.skip).subscribe(
            res => this.entryExits = res.body
        );
    }
}
