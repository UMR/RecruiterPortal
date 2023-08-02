import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LicenseComponent } from './license.component';


const routes: Routes = [{
    path: '',
    children:
        [
            {
                path: '',
                component: LicenseComponent
            },
            {
                path: 'add-edit', loadChildren: './add-edit-license/add-edit-license.module#AddEditLicenseModule'
            },
            {
                path: 'add-edit/:id', loadChildren: './add-edit-license/add-edit-license.module#AddEditLicenseModule'
            }
        ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicenseRoutingModule { }
