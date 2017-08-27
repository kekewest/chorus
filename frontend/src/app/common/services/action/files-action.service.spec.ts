import { TestBed, inject } from '@angular/core/testing';

import { FilesActionService } from './files-action.service';

describe('FilesActionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilesActionService]
    });
  });

  it('should ...', inject([FilesActionService], (service: FilesActionService) => {
    expect(service).toBeTruthy();
  }));
});
