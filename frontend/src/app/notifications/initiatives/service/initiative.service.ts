import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../../../config/service';
import { INITIATIVES } from './mock.initiative.list';

export interface IInitiative {
  id: number;
  code: string;
  title: string;
}

@Injectable()
export class InitiativeService {
  bearer = 'Bearer 1b46f5c6-fdc9-4afe-9b69-0cc6228fbbbf';
  headers = new HttpHeaders().set('Authorization', this.bearer);
  initiatives: IInitiative[] = INITIATIVES;
  constructor(private http: HttpClient, private appConfig: AppConfig) {}

  list = () => this.http.get<IInitiative[]>(this.appConfig.initiativesUrl(), { headers: this.headers });

}
