import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadRequirementsComponent } from './upload-requirements.component';



const routes: Routes = [{
  path: '',
  children:
    [
      {
        path: '',
        component: UploadRequirementsComponent
      }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRequirementsRoutingModule { }
