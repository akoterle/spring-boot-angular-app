import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { AppConfig } from '../../../config/service';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const __CKEDITOR__ = window['CKEDITOR'];

@Component({
  selector: 'app-template-edit',
  templateUrl: './template-edit.component.html',
  styleUrls: ['./template-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TemplateEditComponent implements OnInit {
  ckeditorContent: string;
  uploadImageEndpoint: string;
  templatesUrl: string;
  editorInstance: any;
  templateId: number;

  @ViewChild('uploadImageForm') uploadImageForm: ElementRef;
  @ViewChild('browseImage') browseImage: ElementRef;

  constructor(private appConfig: AppConfig, private http: HttpClient) {
    this.uploadImageEndpoint = this.appConfig.uploadEndpoint();
    this.templatesUrl = this.appConfig.templatesUrl();
    this.ckeditorContent = `<p>Inserire il template</p>`;
  }

  ngOnInit() {}

  onImageButtonClick(event) {
    this.browseImage.nativeElement.click();
  }

  onSaveAll(event) {

    const formData: FormData = new FormData();
    const blobString = new Blob([this.ckeditorContent], {type: 'text/plain'});
    formData.append('templateId', '' + this.templateId);
    formData.append('template', blobString);

    this.http.post(this.templatesUrl, formData).subscribe(data => console.log(data));

  }

  onFileSelected(event) {
    const target: HTMLInputElement = <HTMLInputElement>event.target;
    const formData: FormData = new FormData();

    Array.from(target.files).map(f => formData.append('images', f));
    target.form.reset();

    const blobString = new Blob([this.ckeditorContent], {type: 'text/plain'});
    formData.append('name', 'Nuovo Template 3');
    formData.append('template', blobString);
    formData.append('initiativeId', '1');
    formData.append('language', 'en');

    const result: Observable<any> = this.http.post(this.templatesUrl, formData, {
      headers: new HttpHeaders().set('Authorization', 'Bearer 7d43e0ba-b40b-428f-9a4f-aeaec92b053c'),
    });

    result.subscribe(data => {
      console.log(data);
      this.templateId = data.templateId;
      (this.http.get(this.templatesUrl+'/'+this.templateId+'/render',  {
        headers: new HttpHeaders().set('Authorization', 'Bearer 7d43e0ba-b40b-428f-9a4f-aeaec92b053c'),
      } ) as Observable<any>)
          .subscribe(render => this.ckeditorContent = render.html  );
    });

    const imageTag = '<img src="http://icons.iconarchive.com/icons/tinylab/android-lollipop-apps/128/7-Minutes-icon.png" alt="user image">';


    //const imageElement = __CKEDITOR__.dom.element.createFromHtml(imageTag, this.editorInstance.document);
    //this.editorInstance.insertElement(imageElement);
  }

  onFocus(event) {}
  onBlur(event) {}
  onChange(event) {}
  onReady(event) {
    this.editorInstance = event.editor;
  }
}
