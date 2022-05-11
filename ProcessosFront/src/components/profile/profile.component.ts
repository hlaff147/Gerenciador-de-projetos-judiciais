import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { User } from '../../../../common/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getCurrUser().subscribe((user) => (this.user = user));
  }

  formattedCpf(): string {
    const tmp1 = this.user.cpf.substring(0, 3);
    const tmp2 = this.user.cpf.substring(3, 6);
    const tmp3 = this.user.cpf.substring(6, 9);
    const tmp4 = this.user.cpf.substring(9);
    return `${tmp1}.${tmp2}.${tmp3}-${tmp4}`;
  }

  formattedPhone(): string {
    const tmp1 = this.user.phone.substring(0, 2);
    const tmp2 = this.user.phone.substring(2, 7);
    const tmp3 = this.user.phone.substring(7, 11);
    return `(${tmp1}) ${tmp2}-${tmp3}`;
  }
}
