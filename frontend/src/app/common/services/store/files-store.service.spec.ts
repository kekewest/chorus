import { TestBed, inject } from '@angular/core/testing';

import { FilesStoreService } from './files-store.service';

describe('FilesStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilesStoreService]
    });
  });

  it('should ...', inject([FilesStoreService], (service: FilesStoreService) => {
    expect(service).toBeTruthy();
  }));
});
