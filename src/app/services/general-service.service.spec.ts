import { TestBed, inject } from '@angular/core/testing';

import { GeneralServiceService } from './general-service.service';

describe('GeneralServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneralServiceService]
    });
  });

  it('should be created', inject([GeneralServiceService], (service: GeneralServiceService) => {
    expect(service).toBeTruthy();
  }));
});
