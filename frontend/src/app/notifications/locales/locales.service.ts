import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConfig } from '../../config/service';

export interface ILocale {
  id: number;
  code: string;
  title: string;
}

@Injectable()
export class LocalesService {
  bearer = 'Bearer 1b46f5c6-fdc9-4afe-9b69-0cc6228fbbbf';
  headers = new HttpHeaders().set('Authorization', this.bearer);
  constructor(private http: HttpClient, private appConfig: AppConfig) {}
  list = () => this.http.get<ILocale[]>(this.appConfig.localesUrl(), { headers: this.headers });
}
