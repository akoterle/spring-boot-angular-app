import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
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

  constructor(private api: TemplateService) {}

  ngOnInit() {}

  onImageButtonClick(event) {
    this.browseImageFile.nativeElement.click();
  }

  onSave(event) {
    event.preventDefault();
    this.updateTemplate();
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

  updateTemplate = () => {
    if (undefined === this.template.id) {
      return this.api.save({
        ...this.template,
        initiativeId: 1,
        name: 'Nuovo Template',
        lang: 'en',
        html: this.ckeditorContent
      });
    }

    this.api.update({
      ...this.template,
      name: 'Nuovo Template',
      html: this.ckeditorContent
    });
  };

  addImages = (imageFiles: FileList) => {
    if (undefined === this.template.id) {
      this.api
        .save({
          ...this.template,
          initiativeId: 1,
          name: 'Nuovo Template',
          lang: 'en',
          html: this.ckeditorContent,
          images: imageFiles
        })
        .flatMap(resp => {
          this.template.id = resp.templateId;
          return this.api.render({ ...this.template });
        })
        .subscribe((resp: any) => (this.ckeditorContent = resp.html));
    } else {
      this.api
        .addImages({
          ...this.template,
          images: imageFiles
        })
        .flatMap(resp => this.api.render({ ...this.template }))
        .subscribe((resp: any) => (this.ckeditorContent = resp.html));
    }
  };
}
