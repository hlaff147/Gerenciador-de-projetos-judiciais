import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Document } from '../document';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
})
export class DocumentDetailComponent implements OnInit {
  @Input() document: Document | undefined = undefined;
  @Output() unselectDocumentEvent = new EventEmitter<null>();
  @Output() deleteDocumentEvent = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  unselectDocument(): void {
    this.unselectDocumentEvent.emit();
  }

  deleteDocument(): void {
    this.deleteDocumentEvent.emit(this.document!.id);
  }
}
