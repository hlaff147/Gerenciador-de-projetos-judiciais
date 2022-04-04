import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Proccess } from '../proccess';
import { Document } from '../document';
import { ProccessService } from '../proccess.service';
import { DocumentService } from '../document.service';


@Component({
  selector: 'app-proccess-detail',
  templateUrl: './proccess-detail.component.html',
  styleUrls: ['./proccess-detail.component.css']
})
export class ProccessDetailComponent implements OnInit {

  proccess: Proccess | undefined;
  documents: Document[] = [];
  selectedDoc: Document | undefined;

  constructor(
    private route: ActivatedRoute,
    private proccessService: ProccessService,
    private documentService: DocumentService
  ) { }

  ngOnInit(): void {
    this.getProccess();
    this.getDocuments();
  }

  getProccess(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.proccessService.getProccess(id)
      .subscribe(proccess => this.proccess = proccess);
  }

  getDocuments(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.documentService.getDocuments(id)
      .subscribe(documents => this.documents = documents);
  }

  selectDocument(id: number): void {
    this.documentService.getDocument(id)
      .subscribe(document => this.selectedDoc = document);
    }

  unselectDocument(): void {
    this.selectedDoc = undefined;
  }
}
