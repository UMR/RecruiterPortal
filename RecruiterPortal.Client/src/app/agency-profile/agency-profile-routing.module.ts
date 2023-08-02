import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgencyProfileComponent } from './agency-profile.component';


const routes: Routes = [{
  path: '',
  children:
    [
      {
        path: '',
        component: AgencyProfileComponent
      }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgencyProfileRoutingModule { }
