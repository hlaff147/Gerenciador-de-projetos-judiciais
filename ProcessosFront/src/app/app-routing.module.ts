import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginFormComponent } from '../components/login-form/login-form.component';
import { SignupFormComponent } from '../components/signup-form/signup-form.component';
import { ProccessManagementComponent } from '../components/proccess-management/proccess-management.component';
import { ProccessDetailComponent } from '../components/proccess-detail/proccess-detail.component';
import { UploadFileComponent } from '../components/upload-file/upload-file/upload-file.component';
import { ProfileComponent } from 'src/components/profile/profile.component';
import { AuthGuard } from 'src/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProccessManagementComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginFormComponent },
  { path: 'cadastro', component: SignupFormComponent },
  { path: 'perfil', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'processos',
    component: ProccessManagementComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'upload',
    component: UploadFileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'processos/:id',
    component: ProccessDetailComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
