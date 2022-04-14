import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginFormComponent } from '../components/login-form/login-form.component';
import { SignupFormComponent } from '../components/signup-form/signup-form.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { ProccessDetailComponent } from '../components/proccess-detail/proccess-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
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
