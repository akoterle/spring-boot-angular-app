import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConfigModule } from '../config/module';
import { CKEditorModule } from 'ng2-ckeditor';
import { TemplateEditorModule } from './editor/module';
import { TemplatesComponent } from './templates';

@NgModule({
  declarations: [TemplatesComponent],
  exports: [TemplatesComponent],
  imports: [AppConfigModule, TemplateEditorModule, CommonModule],
  providers: [],
})
export class TemplatesModule {}
