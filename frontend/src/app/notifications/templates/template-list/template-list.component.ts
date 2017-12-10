import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ITemplate, TemplateService } from '../api/template.service';
import { IInitiative } from '../../initiatives/service/initiative.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

interface IState {
  id: number;
  templates: Observable<ITemplate[]>;
  error: string;
}

const states = {
  INITED: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: 3
};

const initialState: IState = {
  id: states.INITED,
  templates: Observable.empty(),
  error: ''
};

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateListComponent implements OnInit {
  state: IState = { ...initialState };
  languages = Observable.of(['it', 'en', 'fr']);

  constructor(private api: TemplateService) {}

  isReadyToShowList = (): boolean => this.state.id !== states.INITED;
  isSuccess = (): boolean => {
    return this.state.id !== states.ERROR;
  };
  getStatusText = () => {
    switch (this.state.id) {
      case states.INITED:
        return 'Nessuna iniziativa selezionata';
      case states.LOADING:
        return 'Caricamento dei template...';
      case states.ERROR:
        return 'Si è verificato un errore: ' + this.state.error;
    }
  };
  onInitiativeChange = (initiative: IInitiative) => {
    this.state.id = states.LOADING;
    this.state.templates = this.api.all().catch(err => {
      this.state.id = states.ERROR;
      this.state.error = err.error;
      return Observable.of([]);
    });
  };

  ngOnInit() {}
}
