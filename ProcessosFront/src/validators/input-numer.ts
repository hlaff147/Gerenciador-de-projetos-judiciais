import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

export function inputNumberValdiator(targetLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const num = control.value;

    const isEmpty = num === '';
    const hasWrongLength = num.length != targetLength;

    const isValid = !isEmpty && !hasWrongLength;

    return isValid
      ? null
      : {
          required: isEmpty,
          length: !isEmpty && hasWrongLength,
        };
  };
}
