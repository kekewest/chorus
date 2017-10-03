/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SheetViewDispatcherService } from './sheet-view-dispatcher.service';

describe('SheetViewDispatcherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SheetViewDispatcherService]
    });
  });

  it('should ...', inject([SheetViewDispatcherService], (service: SheetViewDispatcherService) => {
    expect(service).toBeTruthy();
  }));
});
