import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesLsComponent } from './files-ls.component';

describe('FilesLsComponent', () => {
  let component: FilesLsComponent;
  let fixture: ComponentFixture<FilesLsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesLsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesLsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
