import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { TemplateEditorComponent } from './component';

@NgModule({
  declarations: [TemplateEditorComponent],
  exports: [TemplateEditorComponent],
  imports: [CKEditorModule, CommonModule, FormsModule],
  providers: []
})
export class TemplateEditorModule {}
