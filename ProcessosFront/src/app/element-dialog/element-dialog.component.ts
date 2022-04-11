import { Component, OnInit, Inject } from '@angular/core';
import { Proccess } from '../proccess';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ElementDialog implements OnInit {
  element!: Proccess;

  ngOnInit(): void {}

  constructor(
    public dialogRef: MatDialogRef<ElementDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Proccess,
    public dialog: MatDialog
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
