import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Proccess } from '../proccess';
import { ProccessService } from '../proccess.service';


@Component({
  selector: 'app-proccess-detail',
  templateUrl: './proccess-detail.component.html',
  styleUrls: ['./proccess-detail.component.css']
})
export class ProccessDetailComponent implements OnInit {

  proccess: Proccess | undefined;

  constructor(
    private route: ActivatedRoute,
    private proccessService: ProccessService
  ) { }

  ngOnInit(): void {
    this.getProccess();
  }

  getProccess(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.proccessService.getProccess(id)
      .subscribe(proccess => this.proccess = proccess);
  }

}
