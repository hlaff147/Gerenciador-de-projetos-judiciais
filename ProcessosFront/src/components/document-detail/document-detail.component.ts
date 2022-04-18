import { Component, OnInit, Inject } from '@angular/core';
import { Document } from '../../types/document';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
})
export class DocumentDetailComponent implements OnInit {
  document!: Document;

  constructor(
    public dialogRef: MatDialogRef<DocumentDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.document = this.data.document;
  }

  onClose(): void {
    this.dialogRef.close(null);
  }

  onRemove(): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        message: 'Tem certeza que quer apagar este documento?',
        confirm: 'Sim, eu tenho',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.dialogRef.close(this.document.id);
    });
  }
}
