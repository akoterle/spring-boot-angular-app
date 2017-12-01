import { Component, OnInit } from '@angular/core';
import { FineUploader, UIOptions } from 'fine-uploader';
import { AppConfig } from '../../../config/service';
import { BaseRequestOptions } from '@angular/http';

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

  constructor(private appConfig: AppConfig) {
    this.ckeditorContent = `<p>Html template here</p>`;
    //CkEditorGlobalObject.on('dialogDefinition', this.onDialogDefinition);
    CkEditorGlobalObject.on('instanceReady', function(ev) {
      const editor = ev.editor;
      editor.on('dialogShow', function(ev) {
        let x = ev.editor;
        let y = ev.data;
      });
    });
  }
  onFocus(event) {}
  onBlur(event) {}
  onChange(event) {}
  onReady(event) {
    let x = event;
  }
  save(event) {
    let a = event;
  }

  sendFiles = event => {
    this.uploader.setParams({ templateHtml: this.ckeditorContent });
    this.uploader.uploadStoredFiles();
  };

  onDialogDefinition = ev => {
    const dialogName = ev.data.name;
    const dialogDefinition = ev.data.definition;

    if (dialogName === 'image2') {
      const infoTab = dialogDefinition.getContents('Upload');
      const uploadButton = infoTab.get('uploadButton');
      this.uploadImageInfo = infoTab;
      const action = this.uploadImageInfo.elements[0].action;
      this.uploadImageInfo.elements[0].action = action + '&id=1';
    }
  };

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
