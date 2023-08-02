import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrimaryEditComponent } from './edit-primary.component';

const routes: Routes = [
    { path: '', component: PrimaryEditComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrimaryEditRoutingModule { }
