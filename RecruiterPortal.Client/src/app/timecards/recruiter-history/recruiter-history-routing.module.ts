import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecruiterHistoryComponent } from './recruiter-history.component';


const routes: Routes = [{
    path: '',
    children:
        [
            {
                path: '',
                component: RecruiterHistoryComponent
            }
        ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruiterHistoryRoutingModule { }
