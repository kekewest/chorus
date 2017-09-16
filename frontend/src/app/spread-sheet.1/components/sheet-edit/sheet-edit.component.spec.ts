/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SheetEditComponent } from './sheet-edit.component';

describe('SheetEditComponent', () => {
  let component: SheetEditComponent;
  let fixture: ComponentFixture<SheetEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheetEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
