import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadFileRoutingModule } from './upload-file-routing.module';
import { ComUploadFileModule } from './com-upload-file/com-upload-file.module';
import { UploadFileComponent } from './upload-file.component';

import { LoadingImageModule } from '../common/loading-image.module';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/components/fileupload/fileupload';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { TableModule } from 'primeng/components/table/table';
import { TabViewModule } from 'primeng/tabview';
import { StepsModule } from 'primeng/steps';
import { AgencyHiredComponent } from './agency-hired/agency-hired.component';
import { ReferenceLetterComponent } from './reference-letter/reference-letter.component';
import { PayrollComponent } from './payroll/payroll.component';
import { VoidedChequeComponent } from './voided-cheque/voided-cheque.component';
import { AdministrativeFeeAgreementComponent } from './administrative-fee-agreement/administrative-fee-agreement.component';
import { EmergencyContactComponent } from './emergency-contact/emergency-contact.component';
import { EmploymentApplicationComponent } from './employment-application/employment-application.component';
import { EmploymentEligibilityComponent } from './employment-eligibility/employment-eligibility.component';
import { HepatitisBComponent } from './hepatitis-b/hepatitis-b.component';
import { DeclinationInfluenzaComponent } from './declination-influenza/declination-influenza.component';
import { HippaComponent } from './hippa/hippa.component';
import { IndependentContractorAgreementComponent } from './independent-contractor-agreement/independent-contractor-agreement.component';
import { EmploymentContractComponent } from './employment-contract/employment-contract.component';
import { TermsConditionsIndependentContractorComponent } from './terms-conditions-independent-contractor/terms-conditions-independent-contractor.component';
import { UmrHealthFormComponent } from './umr-health-form/umr-health-form.component';
import { W9CoverSheetComponent } from './w9-cover-sheet/w9-cover-sheet.component';
import { W9Component } from './w9/w9.component';
import { ResumeComponent } from './resume/resume.component';
import { CprComponent } from './cpr/cpr.component';
import { PhysicalExamComponent } from './physical-exam/physical-exam.component';
import { NysChrcComponent } from './nys-chrc/nys-chrc.component';
import { NurseFormComponent } from './nurse-form/nurse-form.component';


@NgModule({
  declarations: [UploadFileComponent, AgencyHiredComponent, ReferenceLetterComponent, PayrollComponent, VoidedChequeComponent,
    AdministrativeFeeAgreementComponent, EmergencyContactComponent, EmploymentApplicationComponent, EmploymentEligibilityComponent,
    HepatitisBComponent, DeclinationInfluenzaComponent, HippaComponent, IndependentContractorAgreementComponent, EmploymentContractComponent,
    TermsConditionsIndependentContractorComponent, UmrHealthFormComponent, W9CoverSheetComponent, W9Component, ResumeComponent, CprComponent,
    PhysicalExamComponent, NysChrcComponent, NurseFormComponent],
    imports: [
        CommonModule,
        UploadFileRoutingModule,
        ComUploadFileModule,
        LoadingImageModule,
        ToastModule,
        FileUploadModule,
        DropdownModule,
        TableModule,
        TabViewModule,
        StepsModule
    ],
    providers: [MessageService]
})
export class UploadFileModule { }
