import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCellAreaComponent } from './selected-cell-area.component';

describe('SelectedCellAreaComponent', () => {
  let component: SelectedCellAreaComponent;
  let fixture: ComponentFixture<SelectedCellAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedCellAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedCellAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
