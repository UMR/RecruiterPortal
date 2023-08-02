import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DownloadFileComponent } from './download-file.component';

const routes: Routes = [{
    path: '',
    children:
        [
            {
                path: '',
                component: DownloadFileComponent
            }
        ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadFileRoutingModule { }
