/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SpreadSheetDispatcherService } from './spread-sheet-dispatcher.service';

describe('SpreadSheetDispatcherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpreadSheetDispatcherService]
    });
  });

  it('should ...', inject([SpreadSheetDispatcherService], (service: SpreadSheetDispatcherService) => {
    expect(service).toBeTruthy();
  }));
});
