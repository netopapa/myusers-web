import { TestBed, inject } from '@angular/core/testing';

import { AparelhoService } from './aparelho.service';

describe('AparelhoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AparelhoService]
    });
  });

  it('should be created', inject([AparelhoService], (service: AparelhoService) => {
    expect(service).toBeTruthy();
  }));
});
