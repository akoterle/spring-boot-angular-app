import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TemplateDetailComponent } from './template-detail/template-detail.component';
import { TemplatesComponent } from './templates.component';

const templatesRoutes: Routes = [
  { path: 'templates', redirectTo: '/notification/templates' },
  { path: 'template/:id', redirectTo: '/notification/template/:id' },
  { path: 'notification/templates', component: TemplatesComponent },
  { path: 'notification/template/:id', component: TemplateDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(templatesRoutes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule {}
