import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/services/user.service';
import { User } from '../../../../common/user';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: User | undefined;

  constructor(
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrUser();
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

  deleteAccount(): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '30rem',
      data: {
        message:
          'Tem certeza que quer apagar a sua conta? Você poderá criar outra conta depois, mas perderá acesso a quaisquer processos que tenha autorado.',
        confirm: 'Sim, tenho certeza',
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result)
        this.userService
          .deleteUser(this.user)
          .subscribe(() => this.router.navigate(['/cadastro']));
    });
  }
}
