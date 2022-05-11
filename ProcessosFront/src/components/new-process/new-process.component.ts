import { Component, OnInit, Inject } from '@angular/core';
import { Process } from '../../../../common/process';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MyErrorStateMatcher } from 'src/validators/error-state-matcher';
import { inputNumberValdiator } from 'src/validators/input-numer';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-process',
  templateUrl: './new-process.component.html',
  styleUrls: ['./new-process.component.css'],
})
export class NewProcessComponent implements OnInit {
  name = new FormControl('', [Validators.required]);
  defendantCpf = new FormControl('', [inputNumberValdiator(11)]);

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {}

  constructor(
    public dialogRef: MatDialogRef<NewProcessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Process,
    public dialog: MatDialog
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (!this.name.valid) return;
    if (!this.defendantCpf.valid) return;

    this.data.name = this.name.value;
    this.data.defendantCpf = this.defendantCpf.value;
    this.dialogRef.close(this.data);
  }
}
