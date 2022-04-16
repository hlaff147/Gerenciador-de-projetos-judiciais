import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

export function cpfValdiator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cpf = control.value;

    const isEmpty = cpf === '';
    const hasWrongLength = cpf.length != 11;

    const isValid = !isEmpty && !hasWrongLength;

    return isValid
      ? null
      : {
          required: isEmpty,
          length: !isEmpty && hasWrongLength,
        };
  };
}
