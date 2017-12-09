import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ITemplate, TemplateService } from '../api/template.service';
import { IInitiative } from '../../initiatives/service/initiative.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

interface IState {
  id: number;
  error: string;
}

const states = {
  WAITING_USER_SELECTION: 0,
  LOADING: 3,
  INITIATIVE_SELECTED: 1,
  LOADING_ERROR: 2
};

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateListComponent implements OnInit {
  templates: Observable<ITemplate[]>;
  state: IState = { id: states.WAITING_USER_SELECTION, error: '' };
  loadingStatusText: string;

  @ViewChild('loadingStatus') loadingStatus: ElementRef;

  constructor(private api: TemplateService) {
    this.state = { id: states.WAITING_USER_SELECTION, error: null };
  }

  showList = (): boolean => this.state.id > states.WAITING_USER_SELECTION;
  loadSuccess = (): boolean => {
    return !(this.state.id === states.LOADING_ERROR);
  };
  showStatus = () => {
    return this.state.id === states.LOADING ? 'Caricamento template...' : 'Errore caricamento: ' + this.state.error;
  };
  onInitiativeChange = (initiative: IInitiative) => {
    this.state.id = states.LOADING;
    // this.loadingStatusText = 'Caricamento template...';
    this.templates = this.api.all().catch(err => {
      this.state.id = states.LOADING_ERROR;
      this.state.error = err.error;
      return Observable.of([]);
    });
  };

  ngOnInit() {}
}
