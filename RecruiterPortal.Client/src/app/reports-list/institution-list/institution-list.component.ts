import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls: ['./institution-list.component.css']
})
export class InstitutionListComponent implements OnInit {

    public isLoading: boolean = false;
    public leads: any[] = [];
    public totalInstitute: number;
    public Id: number;
    public cols: any[];
    public rows: number = 15;
    private take: number;
    private skip: number;
    private pageNumber: number;
    public selectedInstitute: any;

  constructor() { }

    ngOnInit() {

    }
    onLazyLoad(event: LazyLoadEvent) {

    }
    onEdit() {


    }
    onClickClear() {
    }
}
