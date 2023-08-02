import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EducationComponent } from './education.component';
import { CompareValidatorModule } from '../../common/compare-validator.module';

const routes: Routes = [
    {
        path: '', component: EducationComponent
    },
    {
        path: 'edit', loadChildren: './edit-education/edit-education.module#EditEducationModule'
    },
    {
        path: 'edit/:id', loadChildren: './edit-education/edit-education.module#EditEducationModule'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes),
        CompareValidatorModule],
    exports: [RouterModule]
})
export class EducationRoutingModule { }
