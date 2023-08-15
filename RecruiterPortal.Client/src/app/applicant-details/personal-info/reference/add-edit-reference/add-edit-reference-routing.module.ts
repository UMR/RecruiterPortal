import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditReferenceComponent } from './add-edit-reference.component';


const routes: Routes = [{
    path: '',
    children:
        [
            {
                path: '',
                component: AddEditReferenceComponent
            }            
        ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddEditReferenceRoutingModule { }
