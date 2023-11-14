import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PositionListComponent } from './position-list.component';


const routes: Routes = [{
    path: "",
    children: [
        {
            path: "",
            component: PositionListComponent
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PositionListRoutingModule { }
