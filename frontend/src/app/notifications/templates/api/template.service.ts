import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ITemplate } from '../model';
import { AppConfig } from '../../../config/service';

@Injectable()
export class TemplateService {

  constructor(private http: HttpClient, private appConfig: AppConfig) {  }
  list = (initiativeId: string)  => this.http.get(this.appConfig.templatesUrl());

  update = (template: ITemplate) => {
    const templateData: FormData = new FormData();
    templateData.append('templateId', template.id.toString());
    templateData.append('name', template.name);
    templateData.append('template', new Blob([template.html], { type: 'text/plain' }));
    templateData.append('lang', template.lang);
    return this.http.put(this.appConfig.templatesUrl(), templateData);
  }

  save = (template: ITemplate) =>  {
    const templateData: FormData = new FormData();
    templateData.append('name', template.name);
    templateData.append('template', new Blob([template.html], { type: 'text/plain' }));
    templateData.append('lang', template.lang);
    Array.from(template.images).map(img => templateData.append('images', img));
    return this.http.post(this.appConfig.templatesUrl(), templateData);
  }

}
