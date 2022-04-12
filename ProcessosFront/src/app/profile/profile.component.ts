import { Component, OnInit } from '@angular/core';

import { Proccess } from '../proccess';
import { ProccessService } from '../proccess.service';
import { Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ElementDialog } from '../element-dialog/element-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  proccesses: Proccess[] = [];

  constructor(
    private proccessService: ProccessService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.proccessService
      .getProcesses()
      .subscribe((proccesses) => (this.proccesses = proccesses));
  }
  deleteProcess(id: number): void {
    this.proccessService
      .deleteProcess(id)
      .subscribe((proccesses) => (this.proccesses = proccesses));
  }

  openModal(element: Proccess | null): void {
    const dialogRef = this.dialog.open(ElementDialog, {
      width: '30rem',
      data:
        element === null
          ? {
              name: '',
              startDate: '',
              judge: '',
              status: '',
            }
          : element,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.proccesses.push(result);
      }
    });
  }
}
