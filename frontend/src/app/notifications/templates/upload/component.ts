import { TemplateAPIService } from './../api/service';
import { Component, OnInit } from '@angular/core';
import { FineUploader, UIOptions } from 'fine-uploader';

// You may replace "rows" w/ "legacy" or "gallery" depending on your needs
// This assumes you have a loader to handle importing css files, such as Webpack css-loader
// import 'fine-uploader/lib/rows.css';

@Component({
  selector: 'app-file-upload',
  moduleId: module.id.toString(),
  templateUrl: './component.html'
})
export class FileUploadComponent implements OnInit {
  uploader: FineUploader;
  uiOptions: UIOptions;

  constructor() {}

  ngOnInit() {
    this.uiOptions = {
      element: document.getElementById('qq-template'),
      template: 'qq-template'
    };
    this.uploader = new FineUploader(this.uiOptions);
  }
}
