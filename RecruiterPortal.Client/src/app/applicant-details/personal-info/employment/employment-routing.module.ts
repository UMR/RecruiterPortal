import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmploymentComponent } from './employment.component';

const routes: Routes = [
    { path: '', component: EmploymentComponent },
    { path: 'add-edit', loadChildren: './add-edit/add-edit.module#AddEditModule' },
    {
        path: 'add-edit/:id', loadChildren: './add-edit/add-edit.module#AddEditModule'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmploymentRoutingModule { }
