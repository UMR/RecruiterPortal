import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmsHistoryComponent } from './sms-history.component';



const routes: Routes = [{
    path: '',
    children:
        [
            {
                path: '',
                component: SmsHistoryComponent
            }
        ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmsHistoryRoutingModule { }
