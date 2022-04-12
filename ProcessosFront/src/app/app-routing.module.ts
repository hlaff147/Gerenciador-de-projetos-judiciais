import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { ProfileComponent } from './profile/profile.component';
import { ProccessDetailComponent } from './proccess-detail/proccess-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'cadastro', component: SignupFormComponent },
  { path: 'perfil', component: ProfileComponent },
  { path: 'processos/:id', component: ProccessDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
