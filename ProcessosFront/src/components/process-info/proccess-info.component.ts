import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { Process } from '../../../../common/process';
import { User } from '../../../../common/user';

@Component({
  selector: 'app-proccess-info',
  templateUrl: './proccess-info.component.html',
  styleUrls: ['./proccess-info.component.css'],
})
export class ProccessInfoComponent implements OnInit {
  @Input('process') process: Process;

  judge: User | undefined = undefined;
  lawyer: User | undefined = undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getLawyer();
    this.getJudge();
  }

  getLawyer(): void {
    this.userService
      .getUserById(this.process.lawyerId)
      .subscribe((lawyer) => (this.lawyer = lawyer));
  }

  getJudge(): void {
    this.userService
      .getUserById(this.process.judgeId)
      .subscribe((judge) => (this.judge = judge));
  }
}
