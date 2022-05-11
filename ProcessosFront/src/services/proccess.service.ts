import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { retry, map, Observable } from 'rxjs';
import { Process } from '../../../common/process';

@Injectable({
  providedIn: 'root',
})
export class ProccessService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getProcessesByLawyer(id: number): Observable<Process[]> {
    const params: HttpParams = new HttpParams().set('lawyerId', id);
    const url: string = this.API_URL + '/processos';

    return this.http.get(url, { headers: this.headers, params: params }).pipe(
      retry(2),
      map((res) => {
        if (!res?.['success']) return [];
        return res?.['success'];
      })
    );
  }

  getProcessesByJudge(id: number): Observable<Process[]> {
    const params: HttpParams = new HttpParams().set('judgeId', id);
    const url: string = this.API_URL + '/processos';

    return this.http.get(url, { headers: this.headers, params: params }).pipe(
      retry(2),
      map((res) => {
        if (!res?.['success']) return [];
        return res?.['success'];
      })
    );
  }

  getProcessById(id: number): Observable<Process | null> {
    const params: HttpParams = new HttpParams().set('id', id);
    const url: string = this.API_URL + '/processo';

    return this.http.get(url, { headers: this.headers, params: params }).pipe(
      retry(2),
      map((res) => {
        if (!res?.['success']) return null;
        return res?.['success'];
      })
    );
  }

  deleteProccess(id: number): Observable<number | null> {
    const params: HttpParams = new HttpParams().set('id', id);
    const url: string = this.API_URL + '/apagar-processo';

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

  addProcess(process: Process): Observable<Process | null> {
    const url = this.API_URL + '/abrir-processo';

    return this.http.post(url, process, { headers: this.headers }).pipe(
      retry(2),
      map((res) => {
        if (!res?.['success']) return null;
        return res?.['success'];
      })
    );
  }

  editProcess(process: Process): Observable<Process | null> {
    const url = this.API_URL + '/editar-processo';

    return this.http.put(url, process, { headers: this.headers }).pipe(
      retry(2),
      map((res) => {
        if (!res?.['success']) return null;
        return res?.['success'];
      })
    );
  }
}
