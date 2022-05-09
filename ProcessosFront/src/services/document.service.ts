import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { retry, map, Observable } from 'rxjs';
import { Document } from '../../../common/document';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getDocuments(processId: number): Observable<Document[] | null> {
    const url = this.API_URL + '/documentos';
    const params: HttpParams = new HttpParams().set('processId', processId);

    return this.http.get(url, { headers: this.headers, params: params }).pipe(
      retry(2),
      map((res) => {
        if (!res?.['success']) return null;
        return res?.['success'];
      })
    );
  }

  getDocument(id: number): Observable<Document | undefined> {
    const url = this.API_URL + '/documento';
    const params: HttpParams = new HttpParams().set('id', id);

    return this.http.get(url, { headers: this.headers, params: params }).pipe(
      retry(2),
      map((res) => {
        if (!res?.['success']) return null;
        return res?.['success'];
      })
    );
  }

  addDocument(document: Document): Observable<Document | null> {
    const url = this.API_URL + '/anexar-documento';

    return this.http.post(url, document, { headers: this.headers }).pipe(
      retry(2),
      map((res) => {
        if (!res?.['success']) return null;
        return res?.['success'];
      })
    );
  }

  deleteDocument(id: number): Observable<number | null> {
    const url = this.API_URL + '/apagar-documento';
    const params: HttpParams = new HttpParams().set('id', id);

    return this.http
      .delete(url, { headers: this.headers, params: params })
      .pipe(
        retry(2),
        map((res) => {
          if (!res?.['success']) return null;
          return res?.['success'];
        })
      );
  }
}
