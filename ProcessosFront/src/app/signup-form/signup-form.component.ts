import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent implements OnInit {
  check_password: boolean = true;
  cpf: string = '';
  password: string = '';
  repeatPassword: string = '';
  name: string = '';
  email: string = '';
  phone: string = '';
  funcao: string = '';
  rememberUser = false;
  cpfInvalid = false;
  submitted = false;
  nameInvalid = false;
  phoneInvalid = false;
  funcaoInvalid = false;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  cpfIsValid(): boolean {
    return !(this.cpfInvalid || this.cpf === '');
  }

  passwordIsValid(): boolean {
    return this.password !== '';
  }
  repeatPasswordIsValid(): boolean {
    return this.repeatPassword !== '';
  }
  repeatPasswordIsCorrect(event: any): void {
    this.check_password = this.repeatPassword === this.password;
  }
  emailIsValid(): boolean {
    return this.email !== '';
  }
  nameIsValid(): boolean {
    return !(this.nameInvalid || this.name === '');
  }
  phoneIsValid(): boolean {
    return !(this.phoneInvalid || this.phone === '');
  }
  funcaoIsValid(): boolean {
    return !(this.funcaoInvalid || this.funcao === '');
  }
  sigIn(): void {
    this.submitted = true;
    if (!this.cpfIsValid()) return;
    if (!this.passwordIsValid()) return;
    if (!this.phoneIsValid()) return;
    if (!this.funcaoIsValid()) return;
    if (!this.emailIsValid()) return;
    if (!this.repeatPasswordIsValid()) return;

    this.router.navigate(['/']);
  }

  reset(): void {
    this.cpf = '';
    this.password = '';
    this.name = '';
    this.email = '';
    this.phone = '';
    this.funcao = '';
    this.password = '';
    this.rememberUser = false;
    this.submitted = false;
  }

  updateCpf(event: any): void {
    this.cpfInvalid = isNaN(event);
  }
  updatePhone(event: any): void {
    this.phoneInvalid = isNaN(event);
  }
  updateName(event: any): void {
    this.nameInvalid = event.search(/\d+/) !== -1;
  }
}
