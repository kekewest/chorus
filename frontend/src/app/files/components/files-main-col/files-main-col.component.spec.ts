import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesMainColComponent } from './files-main-col.component';

describe('FilesMainColComponent', () => {
  let component: FilesMainColComponent;
  let fixture: ComponentFixture<FilesMainColComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesMainColComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesMainColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
