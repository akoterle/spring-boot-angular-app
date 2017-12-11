import { TestBed, inject } from '@angular/core/testing';

import { LocalesService } from './locales.service';

describe('LocalesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalesService]
    });
  });

  it('should be created', inject([LocalesService], (service: LocalesService) => {
    expect(service).toBeTruthy();
  }));
});
