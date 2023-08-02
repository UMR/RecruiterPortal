import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'angular2-cookie/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { TokenInterceptorService } from './common/token-interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './common/shared.module';
import { LoadingImageModule } from './common/loading-image.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { UmrCookieService } from './common/services/umr-cookie.service';
import { AuthService } from './common/auth.service';
import { VerifyComponent } from './verify/verify.component';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationService } from './registration/registration.service';
import { VerifyService } from './verify/verify.service';
import { InputBehaviorModule } from './common/input-behavior.module';
import { StorageService } from './common/services/storage.service';
import { ApplicantAuthGuard } from './applicant-auth.guard';
//import { HomeResolver } from './home/home.resolver';
import { UserProfileService } from './user-profile/user-profile.service';
import { AgencyProfileService } from './agency-profile/agency-profile.service';



export function cookieServiceFactory() {
  return new CookieService();
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    VerifyComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ToastModule,
    AppRoutingModule,
    SharedModule,
    LoadingImageModule,
    ReactiveFormsModule,
    InputBehaviorModule
  ],
  providers: [{ provide: CookieService, useFactory: cookieServiceFactory },
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    LoginService, MessageService, UmrCookieService, AuthService, AuthGuard,
    RegistrationService, VerifyService, StorageService,
    ApplicantAuthGuard,
    //HomeResolver,
    UserProfileService,
    AgencyProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
