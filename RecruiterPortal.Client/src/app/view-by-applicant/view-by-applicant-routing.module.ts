import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewByApplicantComponent } from './view-by-applicant.component';

const routes: Routes = [{
  path: '',
  children:
    [
      {
        path: '',
        component: ViewByApplicantComponent
      }      
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewByApplicantRoutingModule { }
