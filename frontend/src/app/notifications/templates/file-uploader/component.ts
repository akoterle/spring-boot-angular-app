import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FineUploader, UIOptions } from 'fine-uploader';
import { AppConfig } from '../../../config/service';
import { BaseRequestOptions, Http } from '@angular/http';

const CkEditorGlobalObject = window['CKEDITOR'];

@Component({
  selector: 'app-file-upload',
  moduleId: module.id.toString(),
  templateUrl: './component.html',
  styleUrls: ['./component.css']
})
export class FileUploadComponent implements OnInit {
  ckeditorContent: String;
  uploader: FineUploader;
  uploadImageInfo: any;

  @ViewChild('uploadImageForm') uploadImageForm: ElementRef;
  @ViewChild('browseImage') browseImage: ElementRef;

  constructor(private appConfig: AppConfig, private http: Http) {
    this.ckeditorContent = `<p>Html template here</p>`;
  }
  onFocus(event) {}
  onBlur(event) {}
  onChange(event) {}
  onReady(event) {}
  onInsertImage(event) {
    this.browseImage.nativeElement.click();
  }

  onFileSelected(event) {
    const target: HTMLInputElement = <HTMLInputElement>event.target;
    const files: FileList = target.files;
    const formData: FormData = new FormData();

    Array.from(files).map(f => formData.append('file', f));

    target.form.reset();
    this.http.post('/api/upload/image', formData).subscribe(data => console.log(data));

    const ckEditorInstance = CkEditorGlobalObject.instances.editor1;
    const imageTag = '<img src="http://icons.iconarchive.com/icons/tinylab/android-lollipop-apps/128/7-Minutes-icon.png" alt="user image">';

    const imageElement = CkEditorGlobalObject.dom.element.createFromHtml(imageTag, ckEditorInstance.document);
    ckEditorInstance.insertElement(imageElement);
  }


  ngOnInit() {
    this.uploader = new FineUploader({
      element: document.getElementById('fine-uploader-manual-trigger'),
      template: 'qq-template-manual-trigger',
      request: {
        filenameParam: 'files',
        inputName: 'files',
        endpoint: this.appConfig.uploadEndpoint()
      },
      thumbnails: {
        placeholders: {
          waitingPath: '/fine-uploader/placeholders/waiting-generic.png',
          notAvailablePath: '/fine-uploader/placeholders/not_available-generic.png'
        }
      },
      autoUpload: false,
      debug: false
    });
  }
}
