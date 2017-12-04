import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppConfigModule } from '../../config/module';
import { CKEditorModule } from 'ng2-ckeditor';
import { TemplateEditorModule } from './editor/module';
import { TemplatesComponent } from './component';
import { TemplateListComponent } from './template-list/component';
import { TemplateComponent } from './template/component';
import { TemplateAPIService } from './api/service';
import { FineUploadManualTriggerTemplateComponent } from '../../../3rdParties/fine-uploader/templates/manual-trigger/manual-trigger';
import { FileUploadComponent } from './file-uploader/component';
import { TemplateEditComponent } from './template-edit/template-edit.component';

@NgModule({
  declarations: [TemplatesComponent, TemplateEditComponent, TemplateComponent, TemplateListComponent, FineUploadManualTriggerTemplateComponent, FileUploadComponent],
  exports: [TemplatesComponent, TemplateEditComponent, FineUploadManualTriggerTemplateComponent, FileUploadComponent],
  imports: [FormsModule, CKEditorModule, AppConfigModule, TemplateEditorModule, CommonModule],
  providers: [TemplateAPIService]
})
export class TemplatesModule {}
