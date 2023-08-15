import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LicenseCertificateComponent } from './license-certificate.component';

const routes: Routes = [{
    path: '',
    children:
        [
            {
                path: '',
                component: LicenseCertificateComponent
            },
            {
                path: 'add-edit', loadChildren: './add-edit-license-certificate/add-edit-license-certificate.module#AddEditLicenseCertificateModule'
            },
            {
                path: 'add-edit/:id', loadChildren: './add-edit-license-certificate/add-edit-license-certificate.module#AddEditLicenseCertificateModule'
            }
        ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicenseCertificateRoutingModule { }
