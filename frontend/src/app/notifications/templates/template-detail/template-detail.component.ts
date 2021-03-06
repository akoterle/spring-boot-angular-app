import { Component, Input, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import { ITemplate, TemplateService } from '../api/template.service';
import { AppConfig } from '../../../config/service';
import { IInitiative } from '../../initiatives/service/initiative.service';
import { ILocale } from '../../locales/locales.service';

const CKEDITOR = window['CKEDITOR'];

@Component({
  selector: 'app-template-detail',
  templateUrl: './template-detail.component.html',
  styleUrls: ['./template-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TemplateDetailComponent implements OnInit {
  ckeditorContent: string;
  testRecipient: string;
  uploadImageEndpoint: string;
  templatesUrl: string;
  editorInstance: any;
  template: ITemplate;
  initiative: IInitiative;
  locale: ILocale;

  @ViewChild('uploadImageForm') uploadImageForm: ElementRef;
  @ViewChild('browseImageFile') browseImageFile: ElementRef;
  @ViewChild('uploadAttachmentForm') uploadAttachmentForm: ElementRef;
  @ViewChild('browseAttachment') browseAttachment: ElementRef;

  constructor(private api: TemplateService, private route: ActivatedRoute, private router: Router) {
    const newTemplate: ITemplate = {
      id: undefined,
      initiativeId: 1,
      name: 'Nuovo Template',
      html: '',
      language: 'en',
      images: undefined,
      attachments: undefined
    };
    this.template = { ...newTemplate };

  }

  ngOnInit() {
    const f = (params: ParamMap) => this.api.getTemplate(params.get('id'));
    this.route.paramMap.switchMap((params: ParamMap) => f(params)).subscribe(t => {
      this.template = { ...t };

      this.ckeditorContent = this.template.html;
    });

  }

  onInitiativeChange = (initiative: IInitiative) => {
    this.initiative = initiative;
  };

  onLocaleChange = (locale: ILocale) => {
    this.locale = locale;
  };


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

  isTemplateValid() {
    return this.template.id !== undefined;
  }

  onTest(event) {
    event.preventDefault();
    this.api.test({ ...this.template }, this.testRecipient).subscribe(res => console.log(res));
  }

  onImageSelected(event) {
    const target: HTMLInputElement = <HTMLInputElement>event.target;

    const ckEditorInstance = this.editorInstance; // CKEDITOR.instances.editor1;
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

  onFocus(event) { }
  onBlur(event) { }
  onChange(event) { }
  onReady(event) {
    this.editorInstance = event.editor;
  }

  updateTemplate = () => {
    if (undefined === this.template.id) {
      this.api
        .save({
          ...this.template,
          html: this.ckeditorContent
        })
        .subscribe((resp: any) => (this.template.id = resp.templateId));
    } else {
      this.api
        .update({
          ...this.template,
          html: this.ckeditorContent
        })
        .subscribe(resp => console.log(resp));
    }
  };

  addImages = (imageFiles: FileList) => {
    if (undefined === this.template.id) {
      this.api
        .save({
          ...this.template,
          initiativeId: 1,
          name: this.template.name,
          language: this.template.language,
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
          html: this.ckeditorContent,
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
          language: this.template.language,
          html: this.ckeditorContent,
          attachments: attachments
        })
        .subscribe((resp: any) => {
          this.template.id = resp.templateId;
        });
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
