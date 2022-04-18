import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css'],
})
export class ConfirmModalComponent implements OnInit {
  message: string = 'Tem certeza que você quer fazer isso?';
  confirm: string = 'Sim';
  deny: string = 'Não';

  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data.message) this.message = this.data.message;

    if (this.data.confirm) this.confirm = this.data.confirm;

    if (this.data.deny) this.deny = this.data.deny;
  }

  onClose(result: boolean) {
    this.dialogRef.close(result);
  }
}
