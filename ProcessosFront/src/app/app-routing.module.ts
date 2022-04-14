import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginFormComponent } from '../components/login-form/login-form.component';
import { SignupFormComponent } from '../components/signup-form/signup-form.component';
import { ProccessManagementComponent } from '../components/proccess-management/proccess-management.component';
import { ProccessDetailComponent } from '../components/proccess-detail/proccess-detail.component';
import { ProfileComponent } from 'src/components/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
  { path: 'cadastro', component: SignupFormComponent },
  { path: 'perfil', component: ProfileComponent },
  { path: 'processos', component: ProccessManagementComponent },
  { path: 'processos/:id', component: ProccessDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
