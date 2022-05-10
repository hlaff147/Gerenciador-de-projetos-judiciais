import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { nameValidator } from 'src/validators/name';
import { inputNumberValdiator } from 'src/validators/input-numer';
import { passwordValidator } from 'src/validators/password';
import { confPasswordValidator } from 'src/validators/confirm-password';
import { User } from '../../../../common/user';
import { UserService } from 'src/services/user.service';
import { MyErrorStateMatcher } from 'src/validators/error-state-matcher';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent implements OnInit {
  name = new FormControl('', [nameValidator()]);
  cpf = new FormControl('', [inputNumberValdiator(11)]);
  email = new FormControl('');
  phone = new FormControl('', [inputNumberValdiator(11)]);
  password = new FormControl('', [passwordValidator()]);
  confPassword = new FormControl('', [
    Validators.required,
    confPasswordValidator(this.password),
  ]);
  role = new FormControl('');

  roles = ['advogado', 'juiz', 'cliente', 'réu'];
  signupFailed: boolean = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {}

  signupUser(): void {
    if (!this.name.valid) return;
    if (!this.cpf.valid) return;
    if (!this.email.valid) return;
    if (!this.phone.valid) return;
    if (!this.password.valid) return;
    if (!this.confPassword.valid) return;
    if (!this.role.valid) return;

    const user = this.getUser();

    this.userService.signupUser(user).subscribe((data) => {
      if (data) this.router.navigate(['/processos']);
      else this.signupFailed = true;
    });
  }

  getUser(): User {
    return {
      name: this.name.value,
      cpf: this.cpf.value,
      email: this.email.value,
      phone: this.phone.value,
      role: this.role.value,
      password: this.password.value,
    };
  }
}
