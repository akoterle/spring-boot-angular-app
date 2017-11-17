import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Hierarchy } from '../hierarchy';
import { ConfigService } from '../../config/config.service';
import 'rxjs/add/operator/map';

@Injectable()
export class HierarchiesService {
  constructor(private config: ConfigService, private http: Http) {
    this.http = http;
    this.config = config;
  }
  api = {
    hierarchies: () => this.http.get(this.config.environment.api.hierarchies.list)
  };

  hierarchies = (): Observable<Hierarchy[]> => this.api.hierarchies().map(r => r.json());
}
