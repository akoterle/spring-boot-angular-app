import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../config/service';

export class Hierarchy {
  id: number;
  name: string;
}

@Injectable()
export class HierarchiesService {
  constructor(private config: AppConfig, private http: HttpClient) {
  }

  hierarchies = () => this.http.get(this.config.environment.api.hierarchies.list);
}
