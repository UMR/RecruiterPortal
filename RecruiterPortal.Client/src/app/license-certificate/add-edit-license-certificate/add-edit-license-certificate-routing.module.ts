import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditLicenseCertificateComponent } from './add-edit-license-certificate.component';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '', component: AddEditLicenseCertificateComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddEditLicenseCertificateRoutingModule { }
