import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditHepabHippaInfoComponent } from './add-edit-hepab-hippa-info.component';


const routes: Routes = [{
  path: '',
  children:
    [
      {
        path: '',
        component: AddEditHepabHippaInfoComponent
      }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddEditHepabHippaInfoRoutingModule { }
