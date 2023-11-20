import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

    public hasEducation: boolean = true;
    public hasEmployment: boolean = true;

    constructor(private router: Router) { }

    ngOnInit() {
    }

    nextPage() {        
        this.router.navigate(['personal-info/reference']);
    }

}
