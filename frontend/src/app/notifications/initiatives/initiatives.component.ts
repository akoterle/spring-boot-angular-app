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
  // initiatives: Observable<IInitiative[]>;
  initiatives: IInitiative[];
  selectedInitiative: IInitiative;
  constructor(private api: InitiativeService) {}

  @Input() onSelectionChange: Function;
  onChange = event => this.onSelectionChange(this.selectedInitiative);

  ngOnInit() {
     this.api.list().subscribe(res => this.initiatives = res);
  }
}
