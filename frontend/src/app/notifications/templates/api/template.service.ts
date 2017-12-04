import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ITemplate } from '../model';
import { AppConfig } from '../../../config/service';

@Injectable()
export class TemplateService {
  constructor(private http: HttpClient, private appConfig: AppConfig) {}
  list = (initiativeId: string) => this.http.get(this.appConfig.templatesUrl());

  update = (template: ITemplate): Observable<any> => {
    const templateData: FormData = new FormData();
    templateData.append('templateId', template.id.toString());
    templateData.append('name', template.name);
    templateData.append('template', new Blob([template.html], { type: 'text/plain' }));
    templateData.append('lang', template.lang);
    return this.http.put(this.appConfig.templatesUrl(), templateData);
  };

  save = (template: ITemplate): Observable<any> => {
    const templateData: FormData = new FormData();
    templateData.append('name', template.name);
    templateData.append('template', new Blob([template.html], { type: 'text/plain' }));
    templateData.append('lang', template.lang);
    Array.from(template.images).map(img => templateData.append('images', img));
    return this.http.post(this.appConfig.templatesUrl(), templateData);
  };

  addImages = (template: ITemplate) => {
    const templateData: FormData = new FormData();
    templateData.append('templateId', template.id.toString());
    Array.from(template.images).map(img => templateData.append('images', img));
    return this.http.post(this.appConfig.templatesUrl(), templateData);
  };

  render = (template: ITemplate) => {
    return this.http.get(
      this.appConfig.templatesUrl() + `/${template.id}/render` /*, {
      headers: new HttpHeaders().set('Authorization', 'Bearer 7d43e0ba-b40b-428f-9a4f-aeaec92b053c')
    }  */
    );
  };
}
