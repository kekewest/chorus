/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SheetTabComponent } from './sheet-tab.component';

describe('SheetTabComponent', () => {
  let component: SheetTabComponent;
  let fixture: ComponentFixture<SheetTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheetTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
