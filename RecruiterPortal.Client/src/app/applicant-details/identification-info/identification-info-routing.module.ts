import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdentificationInfoComponent } from './identification-info.component';

const routes: Routes = [{
    path: '',
    children:
        [
            {
                path: '',
                component: IdentificationInfoComponent
            },
            {
                path: 'add-edit', loadChildren: './add-edit-identification-info/add-edit-identification-info.module#AddEditIdentificationInfoModule'
            },
            {
                path: 'add-edit/:id', loadChildren: './add-edit-identification-info/add-edit-identification-info.module#AddEditIdentificationInfoModule'
            }
        ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdentificationInfoRoutingModule { }
