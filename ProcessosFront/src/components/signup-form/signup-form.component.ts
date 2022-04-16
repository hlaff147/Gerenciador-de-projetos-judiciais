import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { nameValidator } from 'src/validators/name';
import { cpfValdiator } from 'src/validators/cpf';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent implements OnInit {
  name = new FormControl('', [nameValidator()]);
  cpf = new FormControl('', [cpfValdiator()]);
  email = new FormControl('');
  phone = new FormControl('');
  password = new FormControl('');
  confPassword = new FormControl('');
  function = new FormControl('');

  functions = ['advogado', 'juiz', 'cliente', 'réu'];
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  signupUser(): void {
    if (!this.name.valid) return;
    if (!this.cpf.valid) return;
    if (!this.email.valid) return;
    if (!this.phone.valid) return;
    if (!this.password.valid) return;
    if (!this.confPassword.valid) return;
    if (!this.function.valid) return;

    this.router.navigate(['/processos']);
  }
}
