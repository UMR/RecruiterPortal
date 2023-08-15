import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HepabHippaInfoComponent } from './hepab-hippa-info.component';


const routes: Routes = [{
  path: '',
  children:
    [
      {
        path: '',
        component: HepabHippaInfoComponent
      },
      {
        path: 'add-edit-hepab-hippa-info', loadChildren: './add-edit-hepab-hippa-info/add-edit-hepab-hippa-info.module#AddEditHepabHippaInfoModule'
      }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HepabHippaInfoRoutingModule { }
