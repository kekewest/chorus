import { TestBed, inject } from '@angular/core/testing';

import { EditCommandTypeService } from './edit-command-type.service';

describe('EditCommandTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditCommandTypeService]
    });
  });

  it('should be created', inject([EditCommandTypeService], (service: EditCommandTypeService) => {
    expect(service).toBeTruthy();
  }));
});
