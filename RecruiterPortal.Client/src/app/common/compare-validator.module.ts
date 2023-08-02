import { NgModule } from '@angular/core';
import { CompareValidator } from './directives/compare-validator.directive';

@NgModule({
    declarations: [CompareValidator],
    exports: [CompareValidator]
})
export class CompareValidatorModule { }
