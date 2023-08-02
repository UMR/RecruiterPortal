import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditEducationComponent } from './edit-education.component';


const routes: Routes = [{
    path: '',
    children:
        [
            {
                path: '',
                component: EditEducationComponent
            }
        ] 
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditEducationRoutingModule { }
