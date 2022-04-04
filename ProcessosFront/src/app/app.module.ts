import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ProfileComponent } from './profile/profile.component';
import { ProccessDetailComponent } from './proccess-detail/proccess-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    ProfileComponent,
    ProccessDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
