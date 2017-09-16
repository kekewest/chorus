/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SpreadSheetStoreService } from './spread-sheet-store.service';

describe('SpreadSheetStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpreadSheetStoreService]
    });
  });

  it('should ...', inject([SpreadSheetStoreService], (service: SpreadSheetStoreService) => {
    expect(service).toBeTruthy();
  }));
});
