import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { inputNumberValdiator } from 'src/validators/input-numer';
import { UserService } from 'src/services/user.service';
import { MyErrorStateMatcher } from 'src/validators/error-state-matcher';

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

  loginFailed: boolean = false;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {}

  loginUser(): void {
    if (!this.cpf.valid) return;
    if (!this.password.valid) return;

    const cpf = this.cpf.value;
    const password = this.password.value;

    this.userService.loginUser(cpf, password).subscribe((user) => {
      if (user) this.onLoginSuccess();
      else this.onLoginFail();
    });
  }

  private onLoginSuccess(): void {
    this.router.navigate(['/']);
  }

  private onLoginFail(): void {
    this.loginFailed = true;
  }
}
