import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/login/auth.service';
import { User } from 'src/types/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.userAuthEvent.subscribe((user) => (this.user = user));
  }

  logout(): void {
    if (this.user) this.authService.logoutUser(null);
  }
}
