import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppConfigModule } from '../../config/module';
import { CKEditorModule } from 'ng2-ckeditor';
import { TemplateService } from './api/template.service';
import { TemplatesComponent } from './templates.component';
import { TemplateListComponent } from './template-list/template-list.component';
import { TemplateDetailComponent } from './template-detail/template-detail.component';
import { TemplateRoutingModule } from './templates.routing.module';
import { InitiativesModule } from '../initiatives/initiatives.module';

@NgModule({
  declarations: [TemplatesComponent, TemplateDetailComponent, TemplateListComponent],
  exports: [TemplatesComponent, TemplateDetailComponent],
  imports: [AppConfigModule, InitiativesModule, FormsModule, CKEditorModule, TemplateRoutingModule, CommonModule],
  providers: [TemplateService]
})
export class TemplatesModule {}
