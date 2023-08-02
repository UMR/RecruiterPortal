import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  public steps: MenuItem[];
  public activeIndex: number = 0;
  public selectedActiveIndex: number = 0;

  constructor(private router: Router) {
    this.activeIndex = this.selectedActiveIndex;
  }

  ngOnInit() {
    this.steps = [{
      label: 'Applicant Info.',
      routerLink: 'applicant-info/edit',
      command: (event: any) => {
        this.activeIndex = 0;
      }
    },
    {
      label: 'Physical Info.',
      routerLink: 'physical-info/edit',
      command: (event: any) => {
        this.activeIndex = 1;
      }
    },
    {
      label: 'Education',
      routerLink: 'education',
      command: (event: any) => {
        this.activeIndex = 2;
      }
    },
    {
      label: 'Employment',
      routerLink: 'employment',
      command: (event: any) => {
        this.activeIndex = 3;
      }
    },
    {
      label: 'Military',
      routerLink: 'military/edit',
      command: (event: any) => {
        this.activeIndex = 4;
      }
    },
    {
      label: 'Reference',
      routerLink: 'reference',
      command: (event: any) => {
        this.activeIndex = 5;
      }
    },
    {
      label: 'Review',
      routerLink: 'review',
      command: (event: any) => {
        this.activeIndex = 6;
      }
    }];
  }

  onActiveIndexChange(e) {
    this.activeIndex = e;
    this.selectedActiveIndex = e;
  }

  onActivate(e) {
    if (this.router.url === "/personal-info/applicant-info/edit") {
      this.activeIndex = 0;
      this.selectedActiveIndex = 0;
    }
    else if (this.router.url === "/personal-info/physical-info/edit") {
      this.activeIndex = 1;
      this.selectedActiveIndex = 1;
    }
    else if (this.router.url === "/personal-info/education") {
      this.activeIndex = 2;
      this.selectedActiveIndex = 2;
    }
    else if (this.router.url === "/personal-info/employment") {
      this.activeIndex = 3;
      this.selectedActiveIndex = 3;
    }
    else if (this.router.url === "/personal-info/military/edit") {
      this.activeIndex = 4;
      this.selectedActiveIndex = 4;
    }
    else if (this.router.url === "/personal-info/reference") {
      this.activeIndex = 5;
      this.selectedActiveIndex = 5;
    }
    else if (this.router.url === "/personal-info/review") {
      this.activeIndex = 6;
      this.selectedActiveIndex = 6;
    }
  }

}
