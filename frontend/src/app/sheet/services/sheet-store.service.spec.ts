/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SheetStoreService } from './sheet-store.service';

describe('SheetStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SheetStoreService]
    });
  });

  it('should ...', inject([SheetStoreService], (service: SheetStoreService) => {
    expect(service).toBeTruthy();
  }));
});
