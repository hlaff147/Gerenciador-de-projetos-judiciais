import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

export function nameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const name = control.value;

    const isEmpty = name === '';
    const hasInavlidChar = /[^a-zA-Z ]+/.test(name);

    const isValid = !isEmpty && !hasInavlidChar;

    return isValid
      ? null
      : {
          required: isEmpty,
          invalidChar: !isEmpty && hasInavlidChar,
        };
  };
}
