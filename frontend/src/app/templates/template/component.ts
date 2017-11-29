import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { dispatch, select, select$, WithSubStore } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { ITemplate } from '../model';

@Component({
  selector: 'app-template',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateComponent {
  static readonly ADD_TEMPLATE = 'ADD_TEMPLATE';
  static readonly EDIT_TEMPLATE = 'EDIT_TEMPLATE';
  static readonly REMOVE_TEMPLATE = 'REMOVE_TEMPLATE';

  @Input() key: string;
  @Input() appName: string;

  @select() readonly name$: Observable<string>;

  @dispatch() addTemplate = () => ({ type: 'ADD_TEMPLATE' });
  @dispatch() editTemplate = () => ({ type: 'EDIT_TEMPLATE' });
  @dispatch() removeTemplate = () => ({ type: 'REMOVE_TEMPLATE' });
}
