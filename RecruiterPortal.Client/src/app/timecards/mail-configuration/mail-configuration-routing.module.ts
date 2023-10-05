import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MailConfigurationComponent } from './mail-configuration.component';


const routes: Routes = [
    {
        path: "",
        component: MailConfigurationComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MailConfigurationRoutingModule { }
