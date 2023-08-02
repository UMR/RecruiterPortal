import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditInfluenzaVaccinationComponent } from './add-edit-influenza-vaccination.component';


const routes: Routes = [{
  path: '',
  children:
    [
      {
        path: '',
        component: AddEditInfluenzaVaccinationComponent
      }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddEditInfluenzaVaccinationRoutingModule { }
