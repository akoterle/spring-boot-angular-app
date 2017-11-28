import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-templates',
  moduleId: module.id.toString(),
  templateUrl: 'templates.html'
})
export class TemplatesComponent implements OnInit {
    ckeditorContent: String;

  constructor() {
    this.ckeditorContent = `<p>Html template here</p>`;
  }
  onFocus(event) {}
  onBlur(event) {}
  onChange(event) {}
  onReady(event) {}
  save(Event) {}

  ngOnInit() {}
}
