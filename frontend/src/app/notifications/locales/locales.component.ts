import { Component, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { ILocale, LocalesService } from './locales.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LocalesComponent implements OnInit {
  locales: Observable<ILocale[]>;
  selectedLocale: ILocale;
  constructor(private api: LocalesService) {}

  @Output() onLocaleChange = new EventEmitter<ILocale>();

  onChange = event => this.onLocaleChange.emit(this.selectedLocale);

  ngOnInit() {
    this.locales = this.api.list();
  }
}
