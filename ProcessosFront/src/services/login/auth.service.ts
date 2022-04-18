import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userAuthed: boolean = false;

  userAuthEvent = new EventEmitter<User | null>();

  constructor(private router: Router) {}

  loginUser(user: User): void {
    this.userAuthed = true;
    this.userAuthEvent.emit(user);
    this.router.navigate(['/']);
  }

  logoutUser(user: User): void {
    this.userAuthed = false;
    this.userAuthEvent.emit(null);
    this.router.navigate(['/login']);
  }

  userIsAuthenticated(): boolean {
    return this.userAuthed;
  }
}
