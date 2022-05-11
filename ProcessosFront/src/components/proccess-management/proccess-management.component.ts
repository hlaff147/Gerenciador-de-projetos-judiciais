import { Component, OnInit } from '@angular/core';

import { ProccessService } from '../../services/proccess.service';
import { MatDialog } from '@angular/material/dialog';
import { NewProcessComponent } from '../new-process/new-process.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { UserService } from 'src/services/user.service';
import { User } from '../../../../common/user';
import { Process } from '../../../../common/process';
import { ActivatedRoute } from '@angular/router';
import { EditProcessComponent } from '../edit-process/edit-process.component';

@Component({
  selector: 'app-proccess-management',
  templateUrl: './proccess-management.component.html',
  styleUrls: ['./proccess-management.component.css'],
})
export class ProccessManagementComponent implements OnInit {
  processes: Process[] = [];
  user: User | null = null;

  constructor(
    private proccessService: ProccessService,
    private userService: UserService,
    public dialog: MatDialog,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrUser();
    this.getProcesses();
  }

  deleteProccess(id: number): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        message: 'Tem certeza que quer apagar este processo?',
        confirm: 'Sim, eu tenho',
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result)
        this.proccessService.deleteProccess(id).subscribe((processId) => {
          const index = this.processes.findIndex((p) => p.id == processId);
          this.processes.splice(index, 1);
        });
    });
  }

  openModal(element: Process | null): void {
    const dialogRef = element
      ? this.dialog.open(EditProcessComponent, {
          width: '30rem',
          data: element,
        })
      : this.dialog.open(NewProcessComponent, {
          width: '30rem',
          data: {
            id: null,
            name: '',
            defendantCpf: '',
            authorId: this.user.id,
          },
        });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      if (element) {
        this.proccessService.editProcess(result).subscribe();
        this.getProcesses();
      } else {
        this.proccessService
          .addProcess(result)
          .subscribe(
            (process) => (this.processes = [process, ...this.processes])
          );
      }
    });
  }
  editProccess(element: Process): void {
    this.openModal(element);
  }

  getProcesses(): void {
    if (this.user.role === 'advogado') {
      this.proccessService
        .getProcessesByLawyer(this.user.id)
        .subscribe((processes) => (this.processes = processes));
    } else if (this.user.role === 'juiz') {
      this.proccessService
        .getProcessesByJudge(this.user.id)
        .subscribe((processes) => (this.processes = processes));
    }
  }
}
