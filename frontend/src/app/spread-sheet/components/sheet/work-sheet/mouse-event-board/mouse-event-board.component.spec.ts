import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MouseEventBoardComponent } from './mouse-event-board.component';

describe('MouseEventBoardComponent', () => {
  let component: MouseEventBoardComponent;
  let fixture: ComponentFixture<MouseEventBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MouseEventBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MouseEventBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
