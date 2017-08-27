import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesLeftColComponent } from './files-left-col.component';

describe('FilesLeftColComponent', () => {
  let component: FilesLeftColComponent;
  let fixture: ComponentFixture<FilesLeftColComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesLeftColComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesLeftColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
