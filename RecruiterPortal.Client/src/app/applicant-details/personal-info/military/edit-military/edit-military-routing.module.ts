import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditMilitaryComponent } from './edit-military.component';


const routes: Routes = [{
    path: '',
    children:
        [
            {
                path: '',
                component: EditMilitaryComponent
            }
        ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditMilitaryRoutingModule { }
