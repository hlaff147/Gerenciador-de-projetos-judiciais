import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document';

@Component({
  selector: 'app-new-document',
  templateUrl: './new-document.component.html',
  styleUrls: ['./new-document.component.css'],
})
export class NewDocumentComponent implements OnInit {
  @Output() closeModalEvent = new EventEmitter<null>();
  @Output() addDocumentEvent = new EventEmitter<Document>();

  newDocName: string = '';
  currDate: string = '';
  selFile: string = '';
  submitted: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  closeModal(): void {
    this.closeModalEvent.emit();
  }

  dateIsValid(): boolean {
    return this.currDate !== '';
  }

  fileIsValid(): boolean {
    return Boolean(this.selFile.match(/(.+)?\.(png|jpg|pdf)/));
  }

  nameIsValid(): boolean {
    return Boolean(this.newDocName.match(/\w+/));
  }

  addDocument(): void {
    const doc = { id: 0, name: this.newDocName, proccessId: 0 };
    this.addDocumentEvent.emit(doc);
  }

  validateFile(): void {
    this.submitted = true;

    if (!this.dateIsValid()) return;
    if (!this.fileIsValid()) return;
    if (!this.nameIsValid()) return;

    this.addDocument();
    this.closeModal();
  }
}
