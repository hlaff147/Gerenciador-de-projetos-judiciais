import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { LoginFormComponent } from '../components/login-form/login-form.component';
import { SignupFormComponent } from '../components/signup-form/signup-form.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { ElementDialog } from '../components/element-dialog/element-dialog.component';
import { ProccessDetailComponent } from '../components/proccess-detail/proccess-detail.component';
import { DocumentListComponent } from '../components/document-list/document-list.component';
import { DocumentDetailComponent } from '../components/document-detail/document-detail.component';
import { NewDocumentComponent } from '../components/new-document/new-document.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    SignupFormComponent,
    ProfileComponent,
    ProccessDetailComponent,
    ElementDialog,
    DocumentListComponent,
    DocumentDetailComponent,
    NewDocumentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
