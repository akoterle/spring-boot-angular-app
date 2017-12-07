import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../../../config/service';
import { INITIATIVES } from './mock.initiative.list';

export interface IInitiative {
  id: number;
  name: string;
}

@Injectable()
export class InitiativeService {
  bearer = 'Bearer 168bf7db-d142-4907-8eec-4affc9745a01';
  headers = new HttpHeaders().set('Authorization', this.bearer);
  initiatives: IInitiative[] = INITIATIVES;
  constructor(private http: HttpClient, private appConfig: AppConfig) {}

  list = () => this.http.get<IInitiative[]>(this.appConfig.initiativesUrl());

}
