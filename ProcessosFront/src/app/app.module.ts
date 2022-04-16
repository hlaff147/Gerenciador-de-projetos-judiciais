import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

import { LoginFormComponent } from '../components/login-form/login-form.component';
import { SignupFormComponent } from '../components/signup-form/signup-form.component';
import { ProccessManagementComponent } from '../components/proccess-management/proccess-management.component';
import { ElementDialog } from '../components/element-dialog/element-dialog.component';
import { ProccessDetailComponent } from '../components/proccess-detail/proccess-detail.component';
import { DocumentListComponent } from '../components/document-list/document-list.component';
import { DocumentDetailComponent } from '../components/document-detail/document-detail.component';
import { NewDocumentComponent } from '../components/new-document/new-document.component';
import { ProfileComponent } from 'src/components/profile/profile.component';
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    SignupFormComponent,
    ProccessManagementComponent,
    ProccessDetailComponent,
    ElementDialog,
    DocumentListComponent,
    DocumentDetailComponent,
    NewDocumentComponent,
    ProfileComponent,
    ConfirmModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    NgxMatFileInputModule,
    NgxMaskModule.forRoot(),
    MatDialogModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatDividerModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
