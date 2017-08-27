import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesDashboardBarComponent } from './files-dashboard-bar.component';

describe('FilesDashboardBarComponent', () => {
  let component: FilesDashboardBarComponent;
  let fixture: ComponentFixture<FilesDashboardBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesDashboardBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesDashboardBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
