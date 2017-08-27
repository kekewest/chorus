/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RowGridComponent } from './row-grid.component';

describe('RowGridComponent', () => {
  let component: RowGridComponent;
  let fixture: ComponentFixture<RowGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
