import { AbstractControl, AsyncValidator, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, debounceTime } from 'rxjs/operators';
import { PositionListService } from './position-list.service';

export function positionValidator(positionListService: PositionListService, id: any = null): AsyncValidatorFn {

    console.log(id);

    return (control: AbstractControl): Observable<ValidationErrors | null> => {

        console.log(control.value);

        return of(control.value).pipe(
            debounceTime(100),
            switchMap(value =>
                positionListService.isExistPositionName(value)
            ),
            map(isValid => (isValid.body == false ? null : { duplicatePositionError: true })),
            catchError(() => of(null))
        );
    };
}


