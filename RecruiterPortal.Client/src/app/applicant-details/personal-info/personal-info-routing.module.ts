import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalInfoComponent } from './personal-info.component';

const routes: Routes = [{
  path: '',
  component: PersonalInfoComponent,
  children: [
    { path: '', redirectTo: "applicant-info/edit", pathMatch: 'full' },
    { path: 'applicant-info', loadChildren: './applicant-info/applicant-info.module#ApplicantInfoModule' },
    { path: 'physical-info', loadChildren: './physical-info/physical-info.module#PhysicalInfoModule' },
    { path: 'education', loadChildren: './education/education.module#EducationModule' },
    /*  { path: 'disclaimer', loadChildren: './disclaimer/disclaimer.module#DisclaimerModule' },*/
    { path: 'military', loadChildren: './military/military.module#MilitaryModule' },
    { path: 'reference', loadChildren: './reference/reference.module#ReferenceModule' },
    { path: 'employment', loadChildren: './employment/employment.module#EmploymentModule' },
    { path: 'license', loadChildren: './license/license.module#LicenseModule' },
    { path: 'review', loadChildren: './review/review.module#ReviewModule' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalInfoRoutingModule { }
