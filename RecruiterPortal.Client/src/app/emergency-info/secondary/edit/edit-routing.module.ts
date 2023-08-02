import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecondaryEditComponent } from './edit.component';

const routes: Routes = [{
    path: '',
    component: SecondaryEditComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SecondaryEditRoutingModule { }
