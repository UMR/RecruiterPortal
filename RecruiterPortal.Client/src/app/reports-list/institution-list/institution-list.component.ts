import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { InstitutionListService } from './institution-list.service';

@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls: ['./institution-list.component.css']
})
export class InstitutionListComponent implements OnInit {

    public isLoading: boolean = false;
    public institutions: any[] = [];
    public totalInstitute: number;
    public Id: number;
    public cols: any[];
    public rows: number = 15;
    private take: number;
    private skip: number;
    private pageNumber: number;
    public selectedInstitute: any;
    public showDialog: boolean = false;

    constructor(private institutionListService: InstitutionListService) { }

    ngOnInit() {

    }

    onLazyLoad(event: LazyLoadEvent) {
        this.pageNumber = Math.ceil((event.first + 1) / event.rows);
        this.take = event.rows;
        this.skip = event.rows * (this.pageNumber - 1);
        this.getAllInstitution();
    }

    getAllInstitution() {
        this.isLoading = true;

        const model = {
            take: this.take,
            skip: this.skip,
        }

        this.institutionListService.getAllInstitute(model)
            .subscribe(response => {
                if (response.status === 200) {
                    this.institutions = (response.body as any).institutes;
                    this.totalInstitute = (response.body as any).totalInstitute;
                }
            },
                err => {
                    this.isLoading = false;
                    //this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to get applicant', detail: '' });
                },
                () => {
                    this.isLoading = false;
                });
    }
    
    handleHideEvent(show) {
        this.showDialog = show;
    }

    addNewInstitution() {
        this.showDialog = true;
    }
}
