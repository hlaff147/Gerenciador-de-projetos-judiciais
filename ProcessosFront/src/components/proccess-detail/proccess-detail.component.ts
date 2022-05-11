import { Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Document } from '../../types/document';
import { ProccessService } from '../../services/proccess.service';
import { DocumentListComponent } from '../document-list/document-list.component';
import { Process } from '../../../../common/process';

@Component({
  selector: 'app-proccess-detail',
  templateUrl: './proccess-detail.component.html',
  styleUrls: ['./proccess-detail.component.css'],
})
export class ProccessDetailComponent implements OnInit {
  @ViewChild(DocumentListComponent, { static: false })
  documentList?: DocumentListComponent;

  process: Process | undefined;
  selectedDoc: Document | undefined;
  showDocModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private proccessService: ProccessService
  ) {}

  ngOnInit(): void {
    this.getProccess();
  }

  getProccess(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.proccessService
      .getProcessById(id)
      .subscribe((process) => (this.process = process));
  }
}
