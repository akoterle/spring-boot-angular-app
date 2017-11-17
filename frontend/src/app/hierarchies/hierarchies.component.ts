import { Component } from '@angular/core';
import { Hierarchy } from './hierarchy';
import { HierarchiesService } from './service/hierarchies.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-hierarchies',
  providers: [HierarchiesService],
  templateUrl: 'hierarchies.html'
})
export class HierarchiesComponent {
  private hierarchies: Hierarchy[];
  private loading: Boolean = false;
  constructor(hierarchiesService: HierarchiesService) {
    hierarchiesService.hierarchies().subscribe(data => {
      this.loading = false;
      this.hierarchies = data;
    });
  }
}
