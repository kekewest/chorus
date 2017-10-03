/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SpreadSheetActionService } from './spread-sheet-action.service';

describe('SpreadSheetActionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpreadSheetActionService]
    });
  });

  it('should ...', inject([SpreadSheetActionService], (service: SpreadSheetActionService) => {
    expect(service).toBeTruthy();
  }));
});
