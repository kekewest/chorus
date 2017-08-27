import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesAreasComponent } from './files-areas.component';

describe('FilesAreasComponent', () => {
  let component: FilesAreasComponent;
  let fixture: ComponentFixture<FilesAreasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesAreasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
