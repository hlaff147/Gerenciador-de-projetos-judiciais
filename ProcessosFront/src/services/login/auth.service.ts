import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../../../../common/user';
import { retry, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private API_URL = 'http://localhost:3000/api/auth';
  private userAuthed: boolean = false;

  userAuthEvent = new EventEmitter<User | null>();

  constructor(private router: Router, private http: HttpClient) {}

  loginUser(cpf: string, password: string): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set('cpf', cpf)
      .set('password', password);

    return this.http
      .get(this.API_URL, { headers: this.headers, params: params })
      .pipe(
        retry(2),
        map((res) => {
          // TODO: Lidar com login inválido
          if (!res?.['success']) return of(null);

          const user: User = res?.['success'][0];
          this.userAuthEvent.emit(user);

          this.userAuthed = true;
          this.router.navigate(['/']);

          return of(user);
        })
      );
  }

  logoutUser(user?: User): void {
    this.userAuthed = false;
    this.userAuthEvent.emit(null);
    this.router.navigate(['/login']);
  }

  userIsAuthenticated(): boolean {
    return this.userAuthed;
  }
}
