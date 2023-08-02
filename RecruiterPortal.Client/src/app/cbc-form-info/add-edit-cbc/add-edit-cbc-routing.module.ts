import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditCBCComponent } from './add-edit-cbc.component';


const routes: Routes = [{
    path: '',
    children:
        [
            {
                path: '',
                component: AddEditCBCComponent
            }
        ] 
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddEditCBCRoutingModule { }
