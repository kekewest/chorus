import { TestBed, inject } from '@angular/core/testing';

import { ElementTypeService } from './element-type.service';

describe('ElementTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElementTypeService]
    });
  });

  it('should be created', inject([ElementTypeService], (service: ElementTypeService) => {
    expect(service).toBeTruthy();
  }));
});
