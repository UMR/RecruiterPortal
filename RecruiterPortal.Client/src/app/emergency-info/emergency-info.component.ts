import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmergencyInfoService } from './emergency-info.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../common/services/storage.service';

@Component({
  selector: 'app-emergency-info',
  templateUrl: './emergency-info.component.html',
  styleUrls: ['./emergency-info.component.css']
})
export class EmergencyInfoComponent implements OnInit {
  public isLoading: boolean = false;
  public primaryInfo: EmergencyInfoModel[] = [];
  public secondaryInfo: EmergencyInfoModel[] = [];

  constructor(private messageService: MessageService,
    private emergencyInfoService: EmergencyInfoService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private storageService: StorageService) { }

  ngOnInit() {
    this.isLoading = true;
    this.emergencyInfoService.getEmergencyInfoByApplicantId(this.storageService.getApplicantId)
      .subscribe(response => {
        console.log(response);
        if ((response as any).Data != null) {
          for (var i = 0; i < (response as any).Data.length; i++) {
            if ((response as any).Data[i].emrType == 1) {
              this.primaryInfo = (response as any).Data[i];
            }
            else {
              this.secondaryInfo = (response as any).Data[i];
            }
          }
        }
      },
        err => {
          this.isLoading = false;
          this.messageService.add({ key: 'toastKey1', severity: 'error', summary: 'Failed to load', detail: '' });
        },
        () => {
          this.isLoading = false;
        });
  }
  primaryEditOnClick() {
    this.router.navigate(['/primary'], { relativeTo: this.activeRoute });
  }
}
