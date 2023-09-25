import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhoneScreenedComponent } from './phone-screened.component';


const routes: Routes = [{
    path: '',
    children:
        [
            {
                path: '',
                component: PhoneScreenedComponent
            }
        ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhoneScreenedRoutingModule { }
