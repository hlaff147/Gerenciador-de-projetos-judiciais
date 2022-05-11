import { Component, OnInit, Inject } from '@angular/core';
import { Process } from '../../../../common/process';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { User } from '../../../../common/user';
import { UserService } from 'src/services/user.service';
import { FormControl, Validators } from '@angular/forms';
import { inputNumberValdiator } from 'src/validators/input-numer';
import { MyErrorStateMatcher } from 'src/validators/error-state-matcher';

@Component({
  selector: 'app-edit-process',
  templateUrl: './edit-process.component.html',
  styleUrls: ['./edit-process.component.css'],
})
export class EditProcessComponent implements OnInit {
  name = new FormControl('', [Validators.required]);
  judgeCpf = new FormControl('', [inputNumberValdiator(11)]);
  status = new FormControl('');

  matcher = new MyErrorStateMatcher();

  process: Process;

  ngOnInit(): void {
    this.process = this.data;
    this.initForms();
  }

  constructor(
    public dialogRef: MatDialogRef<EditProcessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Process,
    public dialog: MatDialog,
    private userService: UserService
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (!this.name.valid) return;
    if (!this.judgeCpf.valid) return;
    if (!this.status.valid) return;

    this.userService.getUserByCpf(this.judgeCpf.value).subscribe((user) => {
      if (user.role !== 'juiz') {
        this.judgeCpf.setErrors({ fakeJudge: true });
        return;
      }

      this.process.name = this.name.value;
      this.process.judgeId = user.id;
      this.process.status = this.status.value;
      this.dialogRef.close(this.process);
    });
  }

  initForms(): void {
    this.name.setValue(this.process.name);
    this.status.setValue(this.process.status);
    this.getJudgeCpf();
  }

  getJudgeCpf(): void {
    this.userService.getUserById(this.data.judgeId).subscribe((user) => {
      this.judgeCpf.setValue(user.cpf);
    });
  }
}
