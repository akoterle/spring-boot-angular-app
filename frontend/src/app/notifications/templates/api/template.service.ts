import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../../../config/service';
import { TEMPLATES } from './mock-template-list';

export interface ITemplate {
  id: number;
  initiativeId: number;
  name: string;
  html: string;
  lang: string;
  images: FileList;
  attachments: FileList;
}

@Injectable()
export class TemplateService {
  bearer = 'Bearer 168bf7db-d142-4907-8eec-4affc9745a01';
  headers = new HttpHeaders().set('Authorization', this.bearer);
  templates: ITemplate[] = TEMPLATES;
  constructor(private http: HttpClient, private appConfig: AppConfig) {}

  // list = (initiativeId: string) => this.http.get(this.appConfig.templatesUrl());

  list = (initiativeId: string) => Observable.of(TEMPLATES);
  getTemplate(id: number | string) {
    return Observable.of(TEMPLATES)
      // (+) before `id` turns the string into a number
      .map(heroes => heroes.find(hero => hero.id === +id));
  }

  update = (template: ITemplate) => {
    const templateData: FormData = new FormData();
    templateData.append('name', template.name);
    templateData.append('template', new Blob([template.html], { type: 'text/plain' }));
    // templateData.append('language', template.lang);
    return this.http.post(this.appConfig.templatesUrl() + `/${template.id}`, templateData, { headers: this.headers });
  };

  save = (template: ITemplate) => {
    const templateData: FormData = new FormData();
    templateData.append('initiativeId', template.initiativeId.toString());
    templateData.append('name', template.name);
    templateData.append('template', new Blob([template.html], { type: 'text/plain' }));
    templateData.append('language', template.lang);
    Array.from(template.images || []).map(img => templateData.append('images', img));
    Array.from(template.attachments || []).map(attach => templateData.append('attachments', attach));
    return this.http.post(this.appConfig.templatesUrl(), templateData, { headers: this.headers });
  };

  addImages = (template: ITemplate) => {
    const templateData: FormData = new FormData();
    templateData.append('template', new Blob([template.html], { type: 'text/plain' }));
    Array.from(template.images).map(img => templateData.append('images', img));
    return this.http.put(this.appConfig.templatesUrl() + `/${template.id}/images`, templateData, { headers: this.headers });
  };

  addAttachments = (template: ITemplate) => {
    const templateData: FormData = new FormData();
    Array.from(template.attachments).map(attach => templateData.append('attachments', attach));
    return this.http.put(this.appConfig.templatesUrl() + `/${template.id}/attachments`, templateData, { headers: this.headers });
  };

  render = (template: ITemplate) => {
    return this.http.get(this.appConfig.templatesUrl() + `/${template.id}/render`, { headers: this.headers });
  };

  test = (template: ITemplate, sendTo: string) => {
    return this.http.post(this.appConfig.templatesUrl() + `/${template.id}/sendto`, {email: sendTo}, { headers: this.headers });
  };
}
