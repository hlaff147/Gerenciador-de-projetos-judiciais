import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../../common/user';
import { retry, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private API_URL = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) {}

  signupUser(user: User): Observable<any> {
    return this.http
      .post<any>(this.API_URL, user, { headers: this.headers })
      .pipe(
        retry(2),
        map((res) => (res.success ? user : null))
      );
  }
}
