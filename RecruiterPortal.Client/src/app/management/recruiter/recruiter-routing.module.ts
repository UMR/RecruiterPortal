import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecruiterComponent } from './recruiter.component';


const routes: Routes = [{
    path: '',
    children:
        [
            {
                path: '',
                component: RecruiterComponent
            }
        ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruiterRoutingModule { }
