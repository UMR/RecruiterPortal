import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfluenzaVaccinationComponent } from './influenza-vaccination.component';


const routes: Routes = [{
  path: '',
  children:
    [
      {
        path: '',
        component: InfluenzaVaccinationComponent
      },
      {
        path: 'add-edit-influenza-vaccination', loadChildren: './add-edit-influenza-vaccination/add-edit-influenza-vaccination.module#AddEditInfluenzaVaccinationModule'
      }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfluenzaVaccinationRoutingModule { }
