import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgressTrackingComponent } from './progress-tracking.component';

const routes: Routes = [{
    path: '',
    children:
        [
            {
                path: '',
                component: ProgressTrackingComponent
            }
        ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgressTrackingRoutingModule { }
