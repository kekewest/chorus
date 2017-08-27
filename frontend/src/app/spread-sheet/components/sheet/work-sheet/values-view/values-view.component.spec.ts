import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuesViewComponent } from './values-view.component';

describe('ValuesViewComponent', () => {
  let component: ValuesViewComponent;
  let fixture: ComponentFixture<ValuesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValuesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
