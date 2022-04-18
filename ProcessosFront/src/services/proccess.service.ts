import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Proccess } from '../types/proccess';
import { PROCCESSES } from '../mocks/mock-proccesslist';

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

  deleteProccess(id: number): Observable<Proccess[]> {
    PROCCESSES.splice(
      PROCCESSES.findIndex((p) => p.id === id),
      1
    );
    return of(PROCCESSES);
  }

  addProccess(proccess: Proccess): Observable<unknown> {
    proccess.id = PROCCESSES[PROCCESSES.length - 1].id + 1;
    PROCCESSES.push(proccess);
    return of(PROCCESSES);
  }
}
