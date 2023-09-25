import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcceptedComponent } from './accepted.component';


const routes: Routes = [{
    path: '',
    children:
        [
            {
                path: '',
                component: AcceptedComponent
            }
        ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcceptedRoutingModule { }
