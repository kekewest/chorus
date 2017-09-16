import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetEditHomeComponent } from './sheet-edit-home.component';

describe('SheetEditHomeComponent', () => {
  let component: SheetEditHomeComponent;
  let fixture: ComponentFixture<SheetEditHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheetEditHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetEditHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
