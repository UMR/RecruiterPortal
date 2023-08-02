import { NgModule } from '@angular/core';

import { TrimmedInput } from './directives/trimmed-input.directive';
import { OnlyNumber } from './directives/only-number.directive';
import { E164PhoneNumber } from './directives/e164-phone-number.directive';


@NgModule({
    declarations: [TrimmedInput, OnlyNumber, E164PhoneNumber],
    exports: [TrimmedInput, OnlyNumber, E164PhoneNumber]
})
export class InputBehaviorModule { }
