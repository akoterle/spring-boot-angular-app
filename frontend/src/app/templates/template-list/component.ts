import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ITemplate } from '../model';
import { TemplateAPIService } from '../api/service';

@Component({
  selector: 'app-template-list',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateListComponent {
  constructor(private api: TemplateAPIService) {
    api.getAll('anyApp');
  }

  @Input() appName: string;
  @Input() templates: Observable<ITemplate[]>;
  @Input() loading: Observable<boolean>;
  @Input() error: Observable<any>;

  // Since we're observing an array of items, we need to set up a 'trackBy'
  // parameter so Angular doesn't tear down and rebuild the list's DOM every
  // time there's an update.
  getKey(_, template: ITemplate) {
    return template.id;
  }
}
