import { Component } from '@angular/core';
import { Hierarchy, HierarchiesService } from './service/hierarchies.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-hierarchies',
  templateUrl: 'hierarchies.html'
})
export class HierarchiesComponent implements OnInit {
  private hierarchies: Observable<Hierarchy[]>;
  private loading: Boolean = false;
  constructor(private hierarchiesService: HierarchiesService) {}
  ngOnInit() {
    this.hierarchiesService.hierarchies();
  }
}
