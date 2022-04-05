import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Proccess } from './proccess';
import { PROCCESSES } from './mock-proccesslist';

@Injectable({
  providedIn: 'root',
})
export class ProccessService {
  constructor() {}

  getProcesses(): Observable<Proccess[]> {
    return of(PROCCESSES);
  }

  getProccess(id: number): Observable<Proccess | undefined> {
    const proccess = PROCCESSES.find((p) => p.id === id);
    return of(proccess);
  }
}
