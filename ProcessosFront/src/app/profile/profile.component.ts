import { Component, OnInit } from '@angular/core';

import { Proccess } from '../proccess';
import { ProccessService } from '../proccess.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  proccesses: Proccess[] = [];

  constructor(private proccessService: ProccessService) {}

  ngOnInit(): void {
    this.proccessService
      .getProcesses()
      .subscribe((proccesses) => (this.proccesses = proccesses));
  }
}
