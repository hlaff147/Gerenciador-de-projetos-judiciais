import { Component, OnInit, Inject } from '@angular/core';
import { Process } from '../../../../common/process';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-new-process',
  templateUrl: './new-process.component.html',
  styleUrls: ['./new-process.component.css'],
})
export class NewProcessComponent implements OnInit {
  ngOnInit(): void {}

  constructor(
    public dialogRef: MatDialogRef<NewProcessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Process,
    public dialog: MatDialog
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
