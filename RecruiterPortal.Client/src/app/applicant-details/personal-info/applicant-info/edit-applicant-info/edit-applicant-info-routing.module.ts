import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditApplicantInfoComponent } from './edit-applicant-info.component';

const routes: Routes = [{ path: '', component: EditApplicantInfoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditApplicantInfoRoutingModule { }
