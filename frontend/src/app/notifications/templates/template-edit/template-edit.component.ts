import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { AppConfig } from '../../../config/service';
import { BaseRequestOptions, Http } from '@angular/http';

const __CKEDITOR__ = window['CKEDITOR'];

@Component({
  selector: 'app-template-edit',
  templateUrl: './template-edit.component.html',
  styleUrls: ['./template-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TemplateEditComponent implements OnInit {
  ckeditorContent: String;
  uploadImageEndpoint: string;
  saveTemplateEndpoint: string;
  editorInstance: any;

  @ViewChild('uploadImageForm') uploadImageForm: ElementRef;
  @ViewChild('browseImage') browseImage: ElementRef;

  constructor(private appConfig: AppConfig, private http: Http) {
    this.uploadImageEndpoint = this.appConfig.uploadEndpoint();
    this.saveTemplateEndpoint = this.appConfig.templatesUrl();
    this.ckeditorContent = `<p>Inserire il template</p>`;
  }

  ngOnInit() {}

  onImageButtonClick(event) {
    this.browseImage.nativeElement.click();
  }

  onSaveAll(event) {

    const payload = { html: this.ckeditorContent, lang: 'en' };
    this.http.post(this.saveTemplateEndpoint, payload).subscribe(data => console.log(data));

  }

  onFileSelected(event) {
    const target: HTMLInputElement = <HTMLInputElement>event.target;
    const formData: FormData = new FormData();

    Array.from(target.files).map(f => formData.append('file', f));
    target.form.reset();
    this.http.post(this.uploadImageEndpoint, formData).subscribe(data => console.log(data));

    const imageTag = '<img src="http://icons.iconarchive.com/icons/tinylab/android-lollipop-apps/128/7-Minutes-icon.png" alt="user image">';

    const imageElement = __CKEDITOR__.dom.element.createFromHtml(imageTag, this.editorInstance.document);
    this.editorInstance.insertElement(imageElement);
  }

  onFocus(event) {}
  onBlur(event) {}
  onChange(event) {}
  onReady(event) {
    this.editorInstance = event.editor;
  }
}
