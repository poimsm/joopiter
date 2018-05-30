import { TestBed, inject } from '@angular/core/testing';

import { NavegarService } from './navegar.service';

describe('NavegarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavegarService]
    });
  });

  it('should be created', inject([NavegarService], (service: NavegarService) => {
    expect(service).toBeTruthy();
  }));
});
