import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaperScreenedComponent } from './paper-screened.component';


const routes: Routes = [{
    path: '',
    children:
        [
            {
                path: '',
                component: PaperScreenedComponent
            }
        ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaperScreenedRoutingModule { }
