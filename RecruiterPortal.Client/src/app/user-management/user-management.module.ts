import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingImageModule } from '../common/loading-image.module';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/components/table/table';
import { SharedModule } from '../common/shared.module';
import { UserManagementService } from './user-management.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StorageService } from '../common/services/storage.service';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    ReactiveFormsModule,
    LoadingImageModule,
    ToastModule,
    DropdownModule,
    AutoCompleteModule,
    TableModule,
    SharedModule,
    DialogModule,
    ConfirmDialogModule
  ],
  providers: [UserManagementService, ConfirmationService, MessageService, StorageService]
})
export class UserManagementModule { }
