import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MilitaryComponent } from './military.component';


const routes: Routes = [{
    path: '',
    children:
        [
            {
                path: '',
                component: MilitaryComponent
            },
            {
                path: 'edit', loadChildren: './edit-military/edit-military.module#EditMilitaryModule'
            }
        ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MilitaryRoutingModule { }
