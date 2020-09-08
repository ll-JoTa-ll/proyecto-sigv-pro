import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarShoppingComponent } from './calendar-shopping.component';

describe('CalendarShoppingComponent', () => {
  let component: CalendarShoppingComponent;
  let fixture: ComponentFixture<CalendarShoppingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarShoppingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
