import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Document } from '../../types/document';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-new-document',
  templateUrl: './new-document.component.html',
  styleUrls: ['./new-document.component.css'],
})
export class NewDocumentComponent implements OnInit {
  @Output() closeModalEvent = new EventEmitter<null>();
  @Output() addDocumentEvent = new EventEmitter<Document>();

  name = new FormControl('', [Validators.required]);
  file = new FormControl('', [Validators.required]);
  date = new FormControl('');
  timeStr!: string;

  matcher = new MyErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<NewDocumentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    const currDate = new Date();
    this.date.setValue(currDate);
    this.timeStr = `${currDate.getHours()}:${currDate.getMinutes()}`;
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onSave(): void {
    this.updateForms();

    if (!this.name.valid) return;
    if (!this.file.valid) return;

    const document: Document = {
      id: 0,
      name: this.name.value,
      proccessId: this.data.proccessId,
    };
    this.dialogRef.close(document);
  }

  updateForms(): void {
    this.name.markAsTouched();
    this.file.markAsTouched();
  }
}
