import { Hierarchy } from '../hierarchy';
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HierarchiesService {
  constructor(private http: Http) {
    this.http = http;
  }

  getHierarchies(): Observable<Hierarchy[]> {
    return this.http.get('/api/list')
      .map(r => {
        return r.json();
      });
  }
}
