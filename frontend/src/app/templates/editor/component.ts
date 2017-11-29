import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-editor',
  moduleId: module.id.toString(),
  templateUrl: './component.html'
})
export class TemplateEditorComponent implements OnInit {
  ckeditorContent: String;

  constructor() {
    this.ckeditorContent = `<p>Html template here</p>`;
  }
  onFocus(event) {}
  onBlur(event) {}
  onChange(event) {}
  onReady(event) {}
  save(event) {
    let a = event;
  }

  ngOnInit() {
  }
}
