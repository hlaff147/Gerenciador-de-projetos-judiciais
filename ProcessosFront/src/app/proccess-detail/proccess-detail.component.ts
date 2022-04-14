import { Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Proccess } from '../proccess';
import { Document } from '../document';
import { ProccessService } from '../proccess.service';
import { DocumentService } from '../document.service';
import { DocumentListComponent } from '../document-list/document-list.component';

@Component({
  selector: 'app-proccess-detail',
  templateUrl: './proccess-detail.component.html',
  styleUrls: ['./proccess-detail.component.css'],
})
export class ProccessDetailComponent implements OnInit {
  @ViewChild(DocumentListComponent, { static: false })
  documentList?: DocumentListComponent;

  proccess: Proccess | undefined;
  selectedDoc: Document | undefined;
  showDocModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private proccessService: ProccessService,
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
    this.getProccess();
  }

  getProccess(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.proccessService
      .getProccess(id)
      .subscribe((proccess) => (this.proccess = proccess));
  }

  selectDocument(document: Document): void {
    this.selectedDoc = document;
  }

  unselectDocument(): void {
    this.selectedDoc = undefined;
  }

  toggleAddDocument(): void {
    this.showDocModal = !this.showDocModal;
  }

  addDocument(document: Document): void {
    document.proccessId = this.proccess!.id;
    this.documentService.addDocument(document);
    this.documentList?.getDocuments();
  }

  deleteDocument(id: number): void {
    this.documentService.deleteDocument(id).subscribe();
    this.unselectDocument();
    this.documentList?.getDocuments();
  }
}
