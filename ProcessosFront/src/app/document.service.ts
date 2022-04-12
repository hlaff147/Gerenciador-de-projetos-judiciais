import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Document } from './document';
import { DOCUMENTS } from './mock-documents';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  constructor() {}

  getDocuments(proccessId: number): Observable<Document[]> {
    const documents = DOCUMENTS.filter((d) => d.proccessId === proccessId);
    return of(documents);
  }

  getDocument(id: number): Observable<Document | undefined> {
    const document = DOCUMENTS.find((d) => d.id === id);
    return of(document);
  }

  addDocument(document: Document): Observable<Document[]> {
    const id = DOCUMENTS[DOCUMENTS.length - 1].id;
    document.id = id + 1;
    DOCUMENTS.push(document);
    return of(DOCUMENTS);
  }

  deleteDocument(id: number): Observable<unknown> {
    const index: number = DOCUMENTS.findIndex((doc) => doc.id == id);
    DOCUMENTS.splice(index, 1);
    return of(DOCUMENTS);
  }
}
