import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfferedComponent } from './offered.component';


const routes: Routes = [{
    path: '',
    children:
        [
            {
                path: '',
                component: OfferedComponent
            }
        ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferedRoutingModule { }
