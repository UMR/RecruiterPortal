import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditLicenseComponent } from './add-edit-license.component';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '', component: AddEditLicenseComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddEditLicenseRoutingModule { }
