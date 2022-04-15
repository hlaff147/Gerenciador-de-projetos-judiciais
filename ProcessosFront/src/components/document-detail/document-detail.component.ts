import { Component, OnInit, Inject } from '@angular/core';
import { Document } from '../../types/document';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
})
export class DocumentDetailComponent implements OnInit {
  document!: Document;

  constructor(
    public dialogRef: MatDialogRef<DocumentDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.document = this.data.document;
  }

  onClose(): void {
    this.dialogRef.close(null);
  }

  onRemove(): void {
    this.dialogRef.close(this.document.id);
  }
}
