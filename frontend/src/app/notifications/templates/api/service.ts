import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { ITemplate } from '../model';
import { AppConfig } from '../../../config/service';

@Injectable()
export class TemplateAPIService {
  templatesUrl: string;
  constructor(private http: Http, private appConfig: AppConfig) {
    this.templatesUrl = appConfig.templatesUrl();
  }
  getAll = (appType: string): Observable<ITemplate[]> => this.http.get(this.templatesUrl).map(resp => resp.json());
  // .map(records => records.map(fromServer));
}
