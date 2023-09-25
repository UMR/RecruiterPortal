import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RefusedComponent } from './refused.component';


const routes: Routes = [{
    path: '',
    children:
        [
            {
                path: '',
                component: RefusedComponent
            }
        ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefusedRoutingModule { }
