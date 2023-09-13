import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { ApplicantAuthGuard } from './applicant-auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { VerifyComponent } from './verify/verify.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeResolver } from './home/home.resolver';


const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [ApplicantAuthGuard],
        //resolve: { home: HomeResolver },
        children: [
            //{ path: '', redirectTo: "view-by-applicant", pathMatch: 'full' },
            //{ path: '', redirectTo: "personal-info", pathMatch: 'full' },      
            { path: 'personal-info', loadChildren: './applicant-details/personal-info/personal-info.module#PersonalInfoModule' },
            /*{ path: 'change-password', loadChildren: './change-password/change-password.module#ChangePasswordModule' },*/
            //{ path: 'progress-tracking', loadChildren: './applicant-details/progress-tracking/progress-tracking.module#ProgressTrackingModule' },
            /*{ path: 'upload-requirements', loadChildren: './applicant-details/upload-file/upload-file.module#UploadFileModule' },*/
            //{ path: 'download-file', loadChildren: './applicant-details/download-file/download-file.module#DownloadFileModule' },
            { path: 'emergency-info', loadChildren: './applicant-details/emergency-info/emergency-info.module#EmergencyInfoModule' },
            { path: 'identification-info', loadChildren: './applicant-details/identification-info/identification-info.module#IdentificationInfoModule' },
            /*{ path: 'license-certificate', loadChildren: './applicant-details/license-certificate/license-certificate.module#LicenseCertificateModule' },*/
            //{ path: 'primary', loadChildren: './applicant-details/emergency-info/primary/primary.module#PrimaryModule' },
            //{ path: 'secondary', loadChildren: './applicant-details/emergency-info/secondary/secondary.module#SecondaryModule' }
            { path: 'w9-form-info', loadChildren: './applicant-details/w9-form/w9-form-info.module#W9FormInfoModule' },
            { path: 'nurse-form', loadChildren: './applicant-details/nurse-form/nurse-form.module#NurseFormModule' },
            { path: 'cbc-form-info', loadChildren: './applicant-details/cbc-form-info/cbc-form-info.module#CBCFormInfoModule' },
            { path: 'uscis-info', loadChildren: './applicant-details/uscis-info/uscis-info.module#UscisInfoModule' },
            { path: 'agreement-form-info', loadChildren: './applicant-details/agreement-form/agreement-form-info.module#AgreementFormInfoModule' },
            { path: 'influenza-vaccination', loadChildren: './applicant-details/influenza-vaccination/influenza-vaccination.module#InfluenzaVaccinationModule' },
            { path: 'terms-conditions', loadChildren: './applicant-details/terms-conditions/terms-conditions.module#TermsConditionsModule' },
            { path: 'hepab-hippa-info', loadChildren: './applicant-details/hepab-hippa-info/hepab-hippa-info.module#HepabHippaInfoModule' },
            /* { path: 'disclaimer', loadChildren: './applicant-details/personal-info/disclaimer/disclaimer.module#DisclaimerModule' }*/
        ]
    },
    {
        canActivate: [AuthGuard],
        path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'
    },
    {
        canActivate: [AuthGuard],
        //resolve: { home: HomeResolver },
        path: 'view-by-applicant', loadChildren: './view-by-applicant/view-by-applicant.module#ViewByApplicantModule'
    },
    {
        canActivate: [AuthGuard],
        path: 'add-applicant', loadChildren: './add-applicant/add-applicant.module#AddApplicantModule'
    },
    {
        canActivate: [AuthGuard],
        path: 'lead', loadChildren: () => import('./view-by-status/lead/lead.module').then(m => m.LeadModule)
    },
    {
        canActivate: [AuthGuard],
        path: 'job-orders', loadChildren: './job-orders/job-orders.module#JobOrdersModule'
    },
    {
        canActivate: [AuthGuard],
        path: 'communication-center', loadChildren: './communication-center/communication-center.module#CommunicationCenterModule'
    },
    {
        canActivate: [AuthGuard],
        path: 'reports', loadChildren: './reports/reports.module#ReportsModule'
    },
    {
        canActivate: [AuthGuard],
        path: 'calendar', loadChildren: './calendar/calendar.module#CalendarModule'
    },
    {
        canActivate: [AuthGuard],
        path: 'agency', loadChildren: () => import('./management/agency/agency.module').then(m => m.AgencyModule)
    },
    {
        canActivate: [AuthGuard],
        path: 'role', loadChildren: () => import('./management/role/role.module').then(m => m.RoleModule)
    },
    {
        canActivate: [AuthGuard],
        path: 'recruiter', loadChildren: () => import('./management/recruiter/recruiter.module').then(m => m.RecruiterModule)
    },
    {
        canActivate: [AuthGuard],
        path: 'change-password', loadChildren: './change-password/change-password.module#ChangePasswordModule'
    },
    {
        canActivate: [AuthGuard],
        path: 'agency-profile', loadChildren: './agency-profile/agency-profile.module#AgencyProfileModule'
    },
    {
        canActivate: [AuthGuard],
        path: 'user-profile', loadChildren: './user-profile/user-profile.module#UserProfileModule'
    },
    {
        canActivate: [AuthGuard],
        path: 'user-management', loadChildren: './user-management/user-management.module#UserManagementModule'
    },
    {
        path: 'registration',
        component: RegistrationComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'verify',
        component: VerifyComponent
    },
    {
        path: 'page-not-found',
        loadChildren: './page-not-found/page-not-found.module#PageNotFoundModule'
    },
    {
        path: '**',
        redirectTo: "/page-not-found"
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
