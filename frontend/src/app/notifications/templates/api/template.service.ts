import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ITemplate } from '../model';
import { AppConfig } from '../../../config/service';

@Injectable()
export class TemplateService {
  bearer = 'Bearer 168bf7db-d142-4907-8eec-4affc9745a01';
  headers = new HttpHeaders().set('Authorization', this.bearer);
  constructor(private http: HttpClient, private appConfig: AppConfig) {}
  list = (initiativeId: string) => this.http.get(this.appConfig.templatesUrl());

  update = (template: ITemplate) => {
    const templateData: FormData = new FormData();
    templateData.append('name', template.name);
    templateData.append('template', new Blob([template.html], { type: 'text/plain' }));
    // templateData.append('language', template.lang);
    return this.http.put(this.appConfig.templatesUrl() + `/${template.id}`, templateData, { headers: this.headers });
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
    Array.from(template.images).map(img => templateData.append('images', img));
    return this.http.post(this.appConfig.templatesUrl() + `/${template.id}/images`, templateData, { headers: this.headers });
  };

  addAttachments = (template: ITemplate) => {
    const templateData: FormData = new FormData();
    Array.from(template.attachments).map(attach => templateData.append('attachments', attach));
    return this.http.post(this.appConfig.templatesUrl() + `/${template.id}/attachments`, templateData, { headers: this.headers });
  };

  render = (template: ITemplate) => {
    return this.http.get(this.appConfig.templatesUrl() + `/${template.id}/render`, { headers: this.headers });
  };

  test = (template: ITemplate, sendTo: string) => {
    const templateData: FormData = new FormData();
    templateData.append('email', sendTo);
    return this.http.post(this.appConfig.templatesUrl() + `/${template.id}/sendto`, templateData, { headers: this.headers });
  };
}
