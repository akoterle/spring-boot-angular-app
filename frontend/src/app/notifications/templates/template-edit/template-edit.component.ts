import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TemplateService } from '../api/template.service';
import { AppConfig } from '../../../config/service';
import { ITemplate } from '../model';

// const CKEDITOR = window['CKEDITOR'];

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
  template: ITemplate;

  @ViewChild('uploadImageForm') uploadImageForm: ElementRef;
  @ViewChild('browseImageFile') browseImageFile: ElementRef;

  constructor(private api: TemplateService, private appConfig: AppConfig, private http: HttpClient) {
    this.uploadImageEndpoint = this.appConfig.uploadEndpoint();
    this.templatesUrl = this.appConfig.templatesUrl();
    this.ckeditorContent = `<p>Inserire il template</p>`;
  }

  ngOnInit() {}

  onImageButtonClick(event) {
    this.browseImageFile.nativeElement.click();
  }

  onSaveAll(event) {
    event.preventDefault();
    const template: ITemplate = {
      ...this.template,
      initiativeId: 1,
      name: 'Nuovo Template',
      lang: 'en',
      html: this.ckeditorContent
    };
    this.updateTemplate(template).subscribe(res => console.log(res));
  }

  onFileSelected(event) {
    const target: HTMLInputElement = <HTMLInputElement>event.target;
    this.addImages(target.files);
    target.form.reset();
  }

  onFocus(event) {}
  onBlur(event) {}
  onChange(event) {}
  onReady(event) {
    this.editorInstance = event.editor;
  }

  updateTemplate = (template: ITemplate) => {
    return undefined === template.id ? this.api.save(template) : this.api.update(template);
  };

  addImages = (imageFiles: FileList) => {
    const template: ITemplate = {
      ...this.template,
      initiativeId: 1,
      name: 'Nuovo Template',
      lang: 'en',
      html: this.ckeditorContent,
      images: imageFiles
    };
    const result: Observable<any> = this.updateTemplate(template);

    // const result: Observable<any> = this.http.post(this.templatesUrl, formData, {
    //   headers: new HttpHeaders().set('Authorization', 'Bearer 7d43e0ba-b40b-428f-9a4f-aeaec92b053c')
    // });

    result.subscribe(data => {
      console.log(data);
      this.template.id = data.templateId;
      (this.http.get(this.templatesUrl + `${this.template.id}/render`, {
        headers: new HttpHeaders().set('Authorization', 'Bearer 7d43e0ba-b40b-428f-9a4f-aeaec92b053c')
      }) as Observable<any>).subscribe(render => (this.ckeditorContent = render.html));
    });
  };
}
