import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditW9Component } from './add-edit-w9.component';


const routes: Routes = [{
    path: '',
    children:
        [
            {
                path: '',
            component: AddEditW9Component
            }
        ] 
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddEditW9RoutingModule { }
