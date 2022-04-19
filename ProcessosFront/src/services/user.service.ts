import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../../../common/user';
import { retry, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private API_URL = 'http://localhost:3000/api';
  private currUser: User | null = null;

  userAuthEvent = new EventEmitter<User | null>();

  constructor(private router: Router, private http: HttpClient) {}

  loginUser(cpf: string, password: string): Observable<User | null> {
    const params: HttpParams = new HttpParams()
      .set('cpf', cpf)
      .set('password', password);

    const url: string = this.API_URL + '/auth';

    return this.http.get(url, { headers: this.headers, params: params }).pipe(
      retry(2),
      map((res) => {
        // TODO: Lidar com login inválido
        if (!res?.['success']) return null;

        this.currUser = res?.['success'];
        this.userAuthEvent.emit(this.currUser);
        this.router.navigate(['/']);

        return this.currUser;
      })
    );
  }

  logoutUser(user?: User): void {
    this.userAuthEvent.emit(null);
    this.currUser = null;
    this.router.navigate(['/login']);
  }

  signupUser(user: User): Observable<User | null> {
    const url: string = this.API_URL + '/cadastrar';

    return this.http.post(url, user, { headers: this.headers }).pipe(
      retry(2),
      map((res) => {
        if (!res?.['success']) return null;

        this.currUser = res?.['success'];
        this.userAuthEvent.emit(this.currUser);
        this.router.navigate(['/']);

        return this.currUser;
      })
    );
  }

  userIsAuthenticated(): boolean {
    return this.currUser != null;
  }
}
