import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadFileComponent } from './upload-file.component';
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


const routes: Routes = [{
  path: '', component: UploadFileComponent, children: [
    { path: '', redirectTo: 'agency-hired', pathMatch: 'full' },
    { path: 'agency-hired', component: AgencyHiredComponent },
    { path: 'reference-letter', component: ReferenceLetterComponent },
    { path: 'payroll', component: PayrollComponent },
    { path: 'voided-cheque', component: VoidedChequeComponent },
    { path: 'administrative-fee-agreement', component: AdministrativeFeeAgreementComponent },
    { path: 'emergency-contact', component: EmergencyContactComponent },
    { path: 'employment-application', component: EmploymentApplicationComponent },
    { path: 'employment-eligibility', component: EmploymentEligibilityComponent },
    { path: 'hepatitis-b', component: HepatitisBComponent },
    { path: 'declination-influenza', component: DeclinationInfluenzaComponent },
    { path: 'hippa', component: HippaComponent },
    { path: 'nurse-form', component: NurseFormComponent },
    { path: 'independent-contractor-agreement', component: IndependentContractorAgreementComponent },
    { path: 'employment-contract', component: EmploymentContractComponent },
    { path: 'terms-conditions-independent-contractor', component: TermsConditionsIndependentContractorComponent },
    { path: 'umr-health-form', component: UmrHealthFormComponent },
    { path: 'w9-cover-sheet', component: W9CoverSheetComponent },
    { path: 'w9', component: W9Component },
    { path: 'resume', component: ResumeComponent },
    { path: 'cpr', component: CprComponent },
    { path: 'physical-exam', component: PhysicalExamComponent },
    { path: 'nys-chrc', component: NysChrcComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadFileRoutingModule { }
