import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommunicationCenterComponent } from './communication-center.component';


const routes: Routes = [{
    path: '',
    children:
        [
            {
                path: '',
                component: CommunicationCenterComponent
            }
        ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunicationCenterRoutingModule { }
