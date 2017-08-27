/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SheetViewStoreService } from './sheet-view-store.service';

describe('SheetViewStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SheetViewStoreService]
    });
  });

  it('should ...', inject([SheetViewStoreService], (service: SheetViewStoreService) => {
    expect(service).toBeTruthy();
  }));
});
