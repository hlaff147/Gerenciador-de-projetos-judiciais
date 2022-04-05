import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  cpf: string = "";
  password: string = "";
  rememberUser = false;
  cpfInvalid = false;
  submitted = false;
  nameInvalid = false
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  cpfIsValid(): boolean {
      return !(this.cpfInvalid || this.cpf === "");
  }

  passwordIsValid(): boolean {
    return this.password !== "";
  }

  loginUser(): void {
    this.submitted = true;
    if (!this.cpfIsValid())
      return ;

    if (!this.passwordIsValid())
      return ;

    this.router.navigate(['/']);
  }

  reset(): void {
    this.cpf = "";
    this.password = "";
    this.rememberUser = false;
    this.submitted = false
  }

  updateCpf(event: any): void {
    this.cpfInvalid = isNaN(event);
  }
  updateName(event: any): void {
    this.cpfInvalid = event.search(/\d+/) === -1
  }
  
}
