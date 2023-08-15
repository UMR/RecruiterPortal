import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmergencyInfoComponent } from './emergency-info.component';

const routes: Routes = [
    {
        path: '', component: EmergencyInfoComponent,
        //loadch
        //{ path: 'primary', loadChildren: './primary/primary.module#PrimaryModule' },
        //{ path: 'secondary', loadChildren: './secondary/secondary.module#SecondaryModule' }
        children: [
            { path: '', redirectTo: "primary"},
            { path: 'primary', loadChildren: './primary/primary.module#PrimaryModule' },
            { path: 'secondary', loadChildren: './secondary/secondary.module#SecondaryModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmergencyInfoRoutingModule { }
