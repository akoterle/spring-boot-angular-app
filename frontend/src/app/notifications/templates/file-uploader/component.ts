import { Component, OnInit } from '@angular/core';
import { FineUploader, UIOptions } from 'fine-uploader';
import { AppConfig } from '../../../config/service';

@Component({
  selector: 'app-file-upload',
  moduleId: module.id.toString(),
  templateUrl: './component.html'
})
export class FileUploadComponent implements OnInit {
  ckeditorContent: String;
  uploader: FineUploader;

  constructor(private appConfig: AppConfig) {
    this.ckeditorContent = `<p>Html template here</p>`;
  }
  onFocus(event) {}
  onBlur(event) {}
  onChange(event) {}
  onReady(event) {}
  save(event) {
    let a = event;
  }

  sendFiles = event => {
    this.uploader.setParams({ templateHtml: this.ckeditorContent });
    this.uploader.uploadStoredFiles();
  }

  ngOnInit() {
    this.uploader = new FineUploader({
      element: document.getElementById('fine-uploader-manual-trigger'),
      template: 'qq-template-manual-trigger',
      request: {
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
