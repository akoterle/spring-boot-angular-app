import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { IInitiative, InitiativeService } from './service/initiative.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-initiatives',
  templateUrl: './initiatives.component.html',
  styleUrls: ['./initiatives.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InitiativesComponent implements OnInit {
  initiatives: Observable<IInitiative[]>;
  selectedInitiative: IInitiative;
  emptyOptionMessageText = 'Seleziona l\'iniziativa';
  constructor(private api: InitiativeService) {}

  @Output() onInitiativeChange = new EventEmitter<IInitiative>();

  onChange = event => this.onInitiativeChange.emit(this.selectedInitiative);

  ngOnInit() {
    this.initiatives = this.api.list();
  }
}
