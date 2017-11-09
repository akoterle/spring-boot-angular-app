import { TestBed, inject } from '@angular/core/testing';

import { HierarchiesService } from './hierarchies.service';

describe('HierarchiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HierarchiesService]
    });
  });

  it('should be created', inject([HierarchiesService], (service: HierarchiesService) => {
    expect(service).toBeTruthy();
  }));
});
