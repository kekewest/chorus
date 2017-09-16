/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SheetActionService } from './sheet-action.service';

describe('SheetActionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SheetActionService]
    });
  });

  it('should ...', inject([SheetActionService], (service: SheetActionService) => {
    expect(service).toBeTruthy();
  }));
});
