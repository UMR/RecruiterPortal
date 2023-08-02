import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReferenceComponent } from './reference.component';


const routes: Routes = [{
    path: '',
    children:
        [
            {
                path: '',
                component: ReferenceComponent
            },
            {
                path: 'add-edit', loadChildren: './add-edit-reference/add-edit-reference.module#AddEditReferenceModule'
            },
            {
                path: 'add-edit/:id', loadChildren: './add-edit-reference/add-edit-reference.module#AddEditReferenceModule'
            }
        ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferenceRoutingModule { }
