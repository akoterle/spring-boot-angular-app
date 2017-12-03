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

  @ViewChild('uploadForm') uploadForm: ElementRef;

  @ViewChild('browseImage') browseImage: ElementRef;

  constructor(private appConfig: AppConfig, private http: Http) {
    this.ckeditorContent = `<p>Html template here</p>`;
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
  onChange(event) {
    const changed = event;
  }
  onReady(event) {
    let x = event;
  }
  onInsertImage(event) {
    this.browseImage.nativeElement.click();
  }

  onFileSelected(event) {
    //const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>event.target;
    const files: FileList = target.files;

    const formData: FormData = new FormData();

    //const ff = Array.from(files);
    const fileAppender = f => () => formData.append('file', f);
    Array.from(files).map(fileAppender); // f => formData.append('file', f));

    // for (let i = 0; i < files.length; i++) {
    //   formData.append('file', files[i]);
    // }

    target.form.reset();
    // POST
    this.http.post('/api/upload/image', formData).subscribe(data => console.log(data));

    var oEditor = CkEditorGlobalObject.instances.editor1;
    var html = '<img src="http://icons.iconarchive.com/icons/tinylab/android-lollipop-apps/128/7-Minutes-icon.png" alt="user image">';

    var newElement = CkEditorGlobalObject.dom.element.createFromHtml(html, oEditor.document);
    oEditor.insertElement(newElement);
  }

  sendFiles = event => {
    this.browseImage.nativeElement.click();
    // document.getElementById('clickableLable').click();
    // event.preventDefault();
    // const form = this.uploadForm.nativeElement;
    //   this.http.post('/api/upload/image', form.serialize);

    // this.uploader.setParams({ templateHtml: this.ckeditorContent });
    // this.uploader.uploadStoredFiles();
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
