import { Component, OnInit } from '@angular/core';

import { PROCCESSES } from '../mock-proccesslist';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  proccesses = PROCCESSES;

  constructor() { }

  ngOnInit(): void {
  }

}
