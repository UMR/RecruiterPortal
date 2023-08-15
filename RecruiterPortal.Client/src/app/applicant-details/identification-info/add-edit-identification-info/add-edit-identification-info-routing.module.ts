import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditIdentificationInfoComponent } from './add-edit-identification-info.component';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '', component: AddEditIdentificationInfoComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AddEditIdentificationInfoRoutingModule { }
