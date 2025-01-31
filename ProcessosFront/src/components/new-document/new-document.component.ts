import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Document } from '../../../../common/document';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyErrorStateMatcher } from 'src/validators/error-state-matcher';
import { UserService } from 'src/services/user.service';
import { UploadFileService } from '../upload-file/upload-file.service';

@Component({
  selector: 'app-new-document',
  templateUrl: './new-document.component.html',
  styleUrls: ['./new-document.component.css'],
})
export class NewDocumentComponent implements OnInit {
  @Output() closeModalEvent = new EventEmitter<null>();
  @Output() addDocumentEvent = new EventEmitter<Document>();

  name = new FormControl('', [Validators.required]);
  file = new FormControl('', [Validators.required]);
  date = new FormControl('');
  timeStr!: string;

  matcher = new MyErrorStateMatcher();
  files: Set<File>;

  constructor(
    public dialogRef: MatDialogRef<NewDocumentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private service: UploadFileService
  ) {}

  ngOnInit(): void {
    const currDate = new Date();
    this.date.setValue(currDate);
    this.timeStr = `${currDate.getHours()}:${currDate.getMinutes()}`;
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  updateForms(): void {
    this.name.markAsTouched();
    this.file.markAsTouched();
  }

  onChange(event) {
    console.log(event);

    const selectedFiles = <FileList>event.srcElement.files;

    const fileNames = [];
    this.files = new Set();
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }
    document.getElementById('customFileLabel').innerHTML = fileNames.join(', ');
  }

  onUpload() {
    const document: Document = {
      name: this.name.value,
      processId: this.data.proccessId,
      postedBy: this.userService.getCurrUser().id,
      data: this.files,
    };
    this.updateForms();
    this.dialogRef.close(document);
    if (this.files && this.files.size > 0) {
      this.service
        .upload(this.files, 'http://localhost:3000/upload')
        .subscribe((response) => console.log('Upload Concluído'));
    }
  }
}
