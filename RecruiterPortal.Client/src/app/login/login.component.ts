import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild("emailRef", { static: false }) emailRef: ElementRef;
  public isLoading: boolean = false;
  public email: string;
  public password: string;
  private emailRegEx = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
  public forgotPassModel: ForgotPasswordModel[] = [];
  private oldQueryParam: string;

  public domain: string = "";
  private urlParts: any;
  public subDomain: string = "";

  constructor(private router: Router, private loginService: LoginService, private messageService: MessageService, private activatedRoute: ActivatedRoute) {
    //this.activatedRoute.queryParams.subscribe(params => {
    //  if (params['old']) {
    //    this.oldQueryParam = params['old'];        
    //  }
    //});
    this.getSubDomain();
  }

  getSubDomain() {
    var fullURL = window.location.host;
    //window.location.host is subdomain.domain.com
    this.urlParts = fullURL.split('.');
    this.subDomain = this.urlParts[0];
    this.domain = this.urlParts[1];

    if (this.subDomain != "" && this.urlParts.length > 2) {
      this.oldQueryParam = this.subDomain;
    }
    else {
      this.oldQueryParam = "umr";
    }
  }

  ngOnInit() {    
    if (this.loginService.isLoggedIn) {
      this.router.navigate(['/']);
    }
    else if (this.loginService.logoutMessage) {
      this.messageService.add({ key: 'toastKey1', severity: 'error', summary: '', detail: this.loginService.logoutMessage });
      this.loginService.defaultLogoutMessage = null;
    }
  }

  ngAfterViewInit() {
    this.emailRef.nativeElement.focus();
  }

  onLogin() {
    this.isLoading = true;
    this.messageService.clear();
    // oldQueryParam will be removed for static connection string
    console.log(this.oldQueryParam);
    this.loginService.login(this.email, this.password, this.oldQueryParam)
      .subscribe(_ => _, err => {
        this.isLoading = false;
        if (err instanceof HttpErrorResponse) {
          this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'The email or password is incorrect', detail: '' });
        }
        else {
          this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Something went wrong on server', detail: '' });
        }
      },
        () => {
          if (this.loginService.logoutMessage) {
            this.isLoading = false;
            this.messageService.add({ key: 'toastKey1', severity: 'error', summary: '', detail: this.loginService.logoutMessage });
            this.loginService.defaultLogoutMessage = null;
          }
        });
  }

  forgotPasswordEvent() {
    if (this.email && this.email.length > 0 && this.emailRegEx.test(this.email)) {
      this.isLoading = true;
      this.messageService.clear();
      this.forgotPassModel = [];
      this.forgotPassModel.push({
        Email: this.email
      })
      this.loginService.forgotPassword(this.forgotPassModel[0])
        .subscribe(data => {
          this.isLoading = false;
          this.messageService.add({ key: 'toastKey1', severity: 'success', summary: 'Please check your mail.', detail: '' });
        },
          err => {
            this.isLoading = false;
            if (err instanceof HttpErrorResponse) {
              this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'The temporary password generation failed.', detail: '' });
            }
            else {
              this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Something went wrong on server.', detail: '' });
            }
          });
    }
    else {
      this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Invalid Email Address.', detail: '' });
    }
  }
}
