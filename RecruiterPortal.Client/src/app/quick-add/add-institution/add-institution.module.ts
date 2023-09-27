import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddInstitutionComponent } from './add-institution.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';



@NgModule({
    declarations: [AddInstitutionComponent],
    exports: [AddInstitutionComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ToastModule
    ]
})
export class AddInstitutionModule { }
