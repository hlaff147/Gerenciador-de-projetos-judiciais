import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Document } from '../document';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  @Input('proccess-id') proccessId: number | undefined = undefined;
  @Output() selectDocumentEvent = new EventEmitter<Document>();
  @Output() newDocumentEvent = new EventEmitter<null>();

  documents: Document[] = [];

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute
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
    this.newDocumentEvent.emit();
  }

  selectDocument(id: number): void {
    this.documentService.getDocument(id).subscribe((document) => {
      this.selectDocumentEvent.emit(document);
    });
  }
}
