import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinalInterviewComponent } from './final-interview.component';


const routes: Routes = [{
    path: '',
    children:
        [
            {
                path: '',
                component: FinalInterviewComponent
            }
        ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinalInterviewRoutingModule { }
