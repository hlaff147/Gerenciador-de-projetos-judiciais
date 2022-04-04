import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Document } from './document';
import { DOCUMENTS } from './mock-documents';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor() { }

  getDocuments(proccessId: number): Observable<Document[]> {
    const documents = DOCUMENTS.filter(d => d.proccessId === proccessId);
    return of(documents);
  }
}
