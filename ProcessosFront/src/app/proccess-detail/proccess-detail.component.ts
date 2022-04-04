import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { PROCCESSES, MockProccess } from '../mock-proccesslist';


@Component({
  selector: 'app-proccess-detail',
  templateUrl: './proccess-detail.component.html',
  styleUrls: ['./proccess-detail.component.css']
})
export class ProccessDetailComponent implements OnInit {

  proccess: MockProccess | undefined = undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProccess();
  }

  getProccess(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.proccess = PROCCESSES.find(p => p.id === id);
  }

}
