import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RejectedComponent } from './rejected.component';


const routes: Routes = [{
    path: '',
    children:
        [
            {
                path: '',
                component: RejectedComponent
            }
        ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RejectedRoutingModule { }
