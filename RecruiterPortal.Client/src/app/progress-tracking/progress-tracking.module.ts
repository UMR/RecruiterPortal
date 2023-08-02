import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressTrackingRoutingModule } from './progress-tracking-routing.module';
import { ProgressTrackingComponent } from './progress-tracking.component';

@NgModule({
    declarations: [ProgressTrackingComponent],
    imports: [
        CommonModule,
        ProgressTrackingRoutingModule
    ]
})
export class ProgressTrackingModule { }
