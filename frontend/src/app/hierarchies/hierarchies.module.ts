import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppConfigModule } from '../config/module';
import { HierarchiesService } from './service/hierarchies.service';
import { HierarchiesComponent } from './hierarchies.component';
import { HierarchyTreeComponent } from './hierarchytree/hierarchytree.component';

@NgModule({
  declarations: [HierarchiesComponent, HierarchyTreeComponent],
  exports: [HierarchiesComponent],
  imports: [AppConfigModule, CommonModule],
  providers: [HierarchiesService]
})
export class HierarchiesModule {}
