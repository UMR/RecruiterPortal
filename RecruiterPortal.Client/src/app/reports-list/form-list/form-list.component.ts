import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
    selector: 'app-form-list',
    templateUrl: './form-list.component.html',
    styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {
    public isLoading: boolean = false;
    public formList: any[] = [];
    public totalForm: number;
    public Id: number;
    public cols: any[];
    public rows: number = 15;
    private take: number;
    private skip: number;
    private pageNumber: number;

    constructor() { }

    ngOnInit() {
    }

    onLazyLoad(event: LazyLoadEvent) {
    }

    onDeleteClick() {
    }
}
