import { Component, OnInit } from '@angular/core';

import { Proccess } from '../../types/proccess';
import { ProccessService } from '../../services/proccess.service';
import { MatDialog } from '@angular/material/dialog';
import { ElementDialog } from '../element-dialog/element-dialog.component';
import { PROCCESSES } from '../../mocks/mock-proccesslist';
import { Observable, of } from 'rxjs';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './proccess-management.component.html',
  styleUrls: ['./proccess-management.component.css'],
})
export class ProccessManagementComponent implements OnInit {
  proccesses: Proccess[] = [];

  getProcesses(): Observable<Proccess[]> {
    return of(PROCCESSES);
  }
  constructor(
    private proccessService: ProccessService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.proccessService
      .getProcesses()
      .subscribe((proccesses) => (this.proccesses = proccesses));
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
        this.proccessService
          .deleteProccess(id)
          .subscribe((proccesses) => (this.proccesses = proccesses));
    });
  }

  openModal(element: Proccess | null): void {
    const dialogRef = this.dialog.open(ElementDialog, {
      width: '30rem',
      data:
        element === null
          ? {
              name: '',
              startDate: new Date(),
              judge: '',
              status: '',
            }
          : element,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.proccessService.addProccess(result).subscribe();
        this.getProcesses();
      }
    });
  }
}
