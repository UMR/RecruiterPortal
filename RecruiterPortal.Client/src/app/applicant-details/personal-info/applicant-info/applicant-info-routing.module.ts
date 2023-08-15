import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicantInfoComponent } from './applicant-info.component';

const routes: Routes = [
    {
        path: '', component: ApplicantInfoComponent
    },
    {
        path: 'edit', loadChildren: './edit-applicant-info/edit-applicant-info.module#EditApplicantInfoModule'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ApplicantInfoRoutingModule { }
