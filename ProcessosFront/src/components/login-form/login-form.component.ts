import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  Validators,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { inputNumberValdiator } from 'src/validators/input-numer';
import { AuthService } from 'src/services/login/auth.service';
import { User } from 'src/types/user';

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
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  cpf = new FormControl('', [inputNumberValdiator(11)]);
  password = new FormControl('', [Validators.required]);
  rememberUser = new FormControl('');

  matcher = new MyErrorStateMatcher();

  user: User = { cpf: '', password: '' };

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  loginUser(): void {
    if (!this.cpf.valid) return;
    if (!this.password.valid) return;

    this.updateUser();
    this.authService.loginUser(this.user);
  }

  updateUser(): void {
    this.user.cpf = this.cpf.value;
    this.user.password = this.password.value;
  }
}
