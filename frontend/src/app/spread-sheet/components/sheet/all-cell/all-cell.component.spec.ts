/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AllCellComponent } from './all-cell.component';

describe('AllCellComponent', () => {
  let component: AllCellComponent;
  let fixture: ComponentFixture<AllCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
