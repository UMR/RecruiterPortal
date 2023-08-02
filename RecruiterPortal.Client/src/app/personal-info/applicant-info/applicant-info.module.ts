import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';

import { ApplicantInfoComponent } from './applicant-info.component';
import { ApplicantInfoRoutingModule } from './applicant-info-routing.module';
import { EditApplicantInfoService } from './edit-applicant-info/edit-applicant-info.service';
import { LoadingImageModule } from '../../common/loading-image.module';

@NgModule({
    declarations: [ApplicantInfoComponent],
    imports: [CommonModule, ApplicantInfoRoutingModule, ToastModule, LoadingImageModule],
    providers: [EditApplicantInfoService]
})
export class ApplicantInfoModule { }
