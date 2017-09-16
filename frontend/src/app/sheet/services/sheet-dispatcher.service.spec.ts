/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SheetDispatcherService } from './sheet-dispatcher.service';

describe('SheetDispatcherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SheetDispatcherService]
    });
  });

  it('should ...', inject([SheetDispatcherService], (service: SheetDispatcherService) => {
    expect(service).toBeTruthy();
  }));
});
