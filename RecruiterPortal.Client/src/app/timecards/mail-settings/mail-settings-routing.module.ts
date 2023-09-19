import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MailSettingsComponent } from './mail-settings.component';


const routes: Routes = [{
    path: '',
    children:
        [
            {
                path: '',
                component: MailSettingsComponent
            }
        ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MailSettingsRoutingModule { }
