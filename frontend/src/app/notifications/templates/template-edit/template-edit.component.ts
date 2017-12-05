import { Component, Input, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import { TemplateService } from '../api/template.service';
import { AppConfig } from '../../../config/service';
import { ITemplate } from '../model';

const CKEDITOR = window['CKEDITOR'];

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
  @ViewChild('uploadAttachmentForm') uploadAttachmentForm: ElementRef;
  @ViewChild('browseAttachment') browseAttachment: ElementRef;

  @Input()
  set templateId(id: number) {
    this.template.id = id;
  }

  constructor(private api: TemplateService) {
    this.template = {
      id: undefined,
      initiativeId: 1,
      name: 'Nuovo Template',
      lang: 'en',
      html: this.ckeditorContent,
      images: undefined,
      attachments: undefined
    };
  }

  ngOnInit() {}

  onImageButtonClick(event) {
    this.browseImageFile.nativeElement.click();
  }
  onAttachmentButtonClick(event) {
    this.browseAttachment.nativeElement.click();
  }

  onSave(event) {
    event.preventDefault();
    this.updateTemplate();
  }

  onCancel(event) {
    event.preventDefault();
  }

  onImageSelected(event) {
    const target: HTMLInputElement = <HTMLInputElement>event.target;

    const ckEditorInstance = CKEDITOR.instances.editor1;
    const imageTag = `<img src="${target.files[0].name}" alt="">`;

    const imageElement = CKEDITOR.dom.element.createFromHtml(imageTag, ckEditorInstance.document);
    ckEditorInstance.insertElement(imageElement);

    this.ckeditorContent = ckEditorInstance.getData();
    this.addImages(target.files);
    target.form.reset();
  }
  onAttachmentSelected(event) {
    const target: HTMLInputElement = <HTMLInputElement>event.target;
    this.addAttachments(target.files);
    target.form.reset();
  }

  onFocus(event) {}
  onBlur(event) {}
  onChange(event) {}
  onReady(event) {
    this.editorInstance = event.editor;
  }

  updateTemplate = () => {
    const update =
      undefined === this.template.id
        ? this.api.save({
            ...this.template,
            html: this.ckeditorContent
          })
        : this.api.update({
            ...this.template,
            html: this.ckeditorContent
          });
    update.subscribe(resp => console.log(resp));
  };

  addImages = (imageFiles: FileList) => {
    if (undefined === this.template.id) {
      this.api
        .save({
          ...this.template,
          initiativeId: 1,
          name: this.template.name,
          lang: this.template.lang,
          html: this.ckeditorContent,
          images: imageFiles
        })
        .mergeMap((resp: any) => {
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

  addAttachments = (attachments: FileList) => {
    if (undefined === this.template.id) {
      this.api
        .save({
          ...this.template,
          initiativeId: 1,
          name: this.template.name,
          lang: this.template.lang,
          html: this.ckeditorContent,
          attachments: attachments
        })
        .subscribe((resp: any) => console.log(resp));
    } else {
      this.api
        .addAttachments({
          ...this.template,
          attachments: attachments
        })
        .subscribe((resp: any) => console.log(resp));
    }
  };
}
