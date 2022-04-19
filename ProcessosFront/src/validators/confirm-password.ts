import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function confPasswordValidator(passwordForm: FormControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const confirm = control.value;
    const password = passwordForm.value;

    const isEmpty = confirm === '';
    const isMatch = confirm === password;

    const isValid = !isEmpty && isMatch;

    return isValid
      ? null
      : { required: isEmpty, nomatch: !isEmpty && !isMatch };
  };
}
