import { Component, OnInit } from '@angular/core';

import { Proccess } from '../../types/proccess';
import { ProccessService } from '../../services/proccess.service';
import { MatDialog } from '@angular/material/dialog';
import { ElementDialog } from '../element-dialog/element-dialog.component';
import { PROCCESSES } from '../../mocks/mock-proccesslist';
import { Observable, of } from 'rxjs';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-proccess-management',
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
        element === null ? {
              id: null,
              name: '',
              startDate: new Date(),
              judge: '',
              status: '',
            }
          : {
            id: element.id,
            name: element.name,
            startDate: element.startDate,
            judge: element.judge,
            status: element.status,
          },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        const index = this.proccesses.findIndex(p => p.id == result.id);
        if (index != -1) {
          this.proccesses[index] = result;
          console.log(this.proccesses[index]);
          console.log(result);
      }else{
        this.proccessService.addProccess(result).subscribe();
        this.getProcesses();}
    }
    });
  }
  editProccess(element: Proccess): void {
    this.openModal(element);
  }
}
