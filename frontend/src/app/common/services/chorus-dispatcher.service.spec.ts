import { TestBed, inject } from '@angular/core/testing';

import { ChorusDispatcherService } from './chorus-dispatcher.service';

describe('ChorusDispatcherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChorusDispatcherService]
    });
  });

  it('should ...', inject([ChorusDispatcherService], (service: ChorusDispatcherService) => {
    expect(service).toBeTruthy();
  }));
});
