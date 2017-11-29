import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConfigModule } from '../config/module';
import { CKEditorModule } from 'ng2-ckeditor';
import { TemplateEditorModule } from './editor/module';
import { TemplatesComponent } from './templates';
import { TemplateListComponent } from './template-list/component';
import { TemplateComponent } from './template/component';
import { TemplateAPIService } from './api/service';

@NgModule({
  declarations: [TemplatesComponent, TemplateComponent, TemplateListComponent],
  exports: [TemplatesComponent],
  imports: [AppConfigModule, TemplateEditorModule, CommonModule],
  providers: [TemplateAPIService],
})
export class TemplatesModule {}
