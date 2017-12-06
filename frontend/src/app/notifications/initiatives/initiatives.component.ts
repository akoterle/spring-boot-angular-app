import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IInitiative, InitiativeService } from './service/initiative.service';
import { Observable } from 'rxjs/Observable';
import { FineUploadManualTriggerTemplateComponent } from '../../../3rdParties/fine-uploader/templates/manual-trigger/manual-trigger';

@Component({
  selector: 'app-initiatives',
  templateUrl: './initiatives.component.html',
  styleUrls: ['./initiatives.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InitiativesComponent implements OnInit {
  initiatives: Observable<IInitiative[]>;
  constructor(private api: InitiativeService) {}

  ngOnInit() {
    this.initiatives = this.api.list();
  }
  onInitiativeSelection(event) {

  }
}
