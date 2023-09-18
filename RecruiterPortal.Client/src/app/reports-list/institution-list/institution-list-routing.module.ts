import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstitutionListComponent } from './institution-list.component';


const routes: Routes = [{
    path: '',
    children:
        [
            {
                path: '',
                component: InstitutionListComponent
            }
        ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstitutionListRoutingModule { }
