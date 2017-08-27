import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetViewCanvasComponent } from './sheet-view-canvas.component';

describe('SheetViewCanvasComponent', () => {
  let component: SheetViewCanvasComponent;
  let fixture: ComponentFixture<SheetViewCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheetViewCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetViewCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
