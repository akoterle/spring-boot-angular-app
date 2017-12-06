import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ITemplate, TemplateService } from '../api/template.service';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateListComponent implements OnInit {
  templates: Observable<ITemplate[]>;
  selectedId: number;
  constructor(private api: TemplateService) {
    this.selectedId = 1;
  }

  ngOnInit() {
    this.templates = this.api.list('anyApp');
  }

  // @Input() appName: string;
  // @Input() templates: Observable<ITemplate[]>;
  // @Input() loading: Observable<boolean>;
  // @Input() error: Observable<any>;

  // Since we're observing an array of items, we need to set up a 'trackBy'
  // parameter so Angular doesn't tear down and rebuild the list's DOM every
  // time there's an update.
  getKey(_, template: ITemplate) {
    return template.id;
  }
}
