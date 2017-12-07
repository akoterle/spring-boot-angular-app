import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ITemplate, TemplateService } from '../api/template.service';
import { IInitiative } from '../../initiatives/service/initiative.service';
import { initDomAdapter } from '@angular/platform-browser/src/browser';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateListComponent implements OnInit {
  templates: Observable<ITemplate[]>;
  // templates: ITemplate[];
  selectedId: number;
  onInitiativeChangeFn: Function;
  constructor(private api: TemplateService) {
    this.selectedId = 1;
    this.onInitiativeChangeFn = this.onInitiativeChange.bind(this);
  }

  onInitiativeChange = (initiative: IInitiative) => {
    // this.templates = this.api.list(initiative);
    //this.api.all().subscribe(res => this.templates = res);
  };

  ngOnInit() {
    //this.api.all().subscribe(res => this.templates = res);
    this.templates = this.api.all();
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
