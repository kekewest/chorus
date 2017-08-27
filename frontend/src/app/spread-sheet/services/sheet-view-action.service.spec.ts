/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SheetViewActionService } from './sheet-view-action.service';

describe('SheetViewActionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SheetViewActionService]
    });
  });

  it('should ...', inject([SheetViewActionService], (service: SheetViewActionService) => {
    expect(service).toBeTruthy();
  }));
});
