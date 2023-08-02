import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingImageModule } from '../common/loading-image.module';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/components/toast/toast';
import { SharedModule } from '../common/shared.module';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { InputMaskModule } from 'primeng/inputmask';


@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    ReactiveFormsModule,
    LoadingImageModule,
    ToastModule,
    DropdownModule,
    AutoCompleteModule,
    SharedModule,
    InputMaskModule
  ],
  providers: [MessageService]
})
export class UserProfileModule { }
