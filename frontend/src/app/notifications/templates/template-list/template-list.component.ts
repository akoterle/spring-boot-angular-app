import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ITemplate, TemplateService } from '../api/template.service';
import { IInitiative } from '../../initiatives/service/initiative.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const states = {
  WAITING_USER_SELECTION: 0,
  INITIATIVE_SELECTED: 1
};


@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateListComponent implements OnInit {
  templates: Observable<ITemplate[]>;
  state = 0;
  loadingStatusText: string;
  loadingError: boolean;

  @ViewChild('loadingStatus') loadingStatus: ElementRef;

  constructor(private api: TemplateService) {
    this.loadingError = false;
    this.loadingStatusText = 'Caricamento template...';
  }

  showList = (): boolean => this.state === states.INITIATIVE_SELECTED;
  onInitiativeChange = (initiative: IInitiative) => {
    this.state = states.INITIATIVE_SELECTED;
    this.templates = this.api.all().catch(err => {
      this.loadingError = true;
      this.loadingStatusText = 'Errore caricamento template:\n' + err.error;
      return Observable.of([]);
    });
  };

  ngOnInit() {}
}
