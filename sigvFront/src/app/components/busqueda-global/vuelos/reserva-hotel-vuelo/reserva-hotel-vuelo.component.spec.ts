import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaHotelVueloComponent } from './reserva-hotel-vuelo.component';

describe('ReservaHotelVueloComponent', () => {
  let component: ReservaHotelVueloComponent;
  let fixture: ComponentFixture<ReservaHotelVueloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservaHotelVueloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaHotelVueloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
