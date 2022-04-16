import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

export function passwordValidator(minLength: number = 5): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;

    const isEmpty = password === '';
    const isShort = password.length < minLength;
    const hasUpperCase = /[A-Z]+/.test(password);
    const hasLowerCase = /[a-z]+/.test(password);
    const hasNumeric = /[0-9]+/.test(password);
    const hasEmoji =
      /(\p{Emoji_Presentation}|\p{Extended_Pictographic})+/gu.test(password);

    const isValid =
      !isEmpty &&
      !isShort &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumeric &&
      !hasEmoji;

    return isValid
      ? null
      : {
          required: isEmpty,
          length: !isEmpty && isShort,
          invalidchar: !isEmpty && !isShort && hasEmoji,
          novalidchar:
            !isEmpty &&
            !isShort &&
            !hasEmoji &&
            !(hasUpperCase && hasLowerCase && hasNumeric),
        };
  };
}
