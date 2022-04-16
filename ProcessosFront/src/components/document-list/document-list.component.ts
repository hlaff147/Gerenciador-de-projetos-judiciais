import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Document } from '../../types/document';
import { DocumentService } from '../../services/document.service';
import { NewDocumentComponent } from '../new-document/new-document.component';
import { MatDialog } from '@angular/material/dialog';
import { DocumentDetailComponent } from '../document-detail/document-detail.component';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  @Input('proccess-id') proccessId: number | undefined = undefined;

  documents: Document[] = [];

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getDocuments();
  }

  getDocuments(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.documentService
      .getDocuments(id)
      .subscribe((documents) => (this.documents = documents));
  }

  addDocument(): void {
    const dialogRef = this.dialog.open(NewDocumentComponent, {
      data: {
        proccessId: this.proccessId,
      },
    });

    dialogRef.afterClosed().subscribe((result: Document) => {
      if (!result) return;

      this.documentService
        .addDocument(result)
        .subscribe(() => this.getDocuments());
    });
  }

  selectDocument(id: number): void {
    this.documentService.getDocument(id).subscribe((document) => {
      const dialogRef = this.dialog.open(DocumentDetailComponent, {
        data: {
          document: document,
        },
      });

      dialogRef.afterClosed().subscribe((result: number) => {
        if (!result) return;

        this.documentService
          .deleteDocument(result)
          .subscribe(() => this.getDocuments());
      });
    });
  }
}
