import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobOrdersComponent } from './job-orders.component';


const routes: Routes = [{
    path: '',
    children:
        [
            {
                path: '',
                component: JobOrdersComponent
            }
        ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobOrdersRoutingModule { }
