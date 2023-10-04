import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddInstitutionComponent } from './add-institution.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { LoadingImageModule } from '../../common/loading-image.module';
import { InputBehaviorModule } from '../../common/input-behavior.module';


@NgModule({
    declarations: [AddInstitutionComponent],
    exports: [AddInstitutionComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ToastModule,
        InputMaskModule,
        AutoCompleteModule,
        LoadingImageModule,
        InputBehaviorModule
    ]
})
export class AddInstitutionModule { }
