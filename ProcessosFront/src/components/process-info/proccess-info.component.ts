import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { ProccessService } from 'src/services/proccess.service';
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
  defendantCpf: string | undefined = undefined;

  constructor(
    private userService: UserService,
    private processService: ProccessService
  ) {}

  ngOnInit(): void {
    this.getAuthor();
    this.getJudge();
    this.getDefendantCpf();
  }

  private getAuthor(): void {
    this.userService
      .getUserById(this.process.authorId)
      .subscribe((lawyer) => (this.lawyer = lawyer));
  }

  private getJudge(): void {
    this.userService
      .getUserById(this.process.judgeId)
      .subscribe((judge) => (this.judge = judge));
  }

  private getDefendantCpf(): void {
    this.defendantCpf = this.process.defendantCpf;
    this.userService
      .getUserByCpf(this.process.defendantCpf)
      .subscribe((defendant) => {
        if (defendant) {
          this.process.defendantId = defendant.id;
          this.processService.editProcess(this.process).subscribe();
        }
      });
  }
}
