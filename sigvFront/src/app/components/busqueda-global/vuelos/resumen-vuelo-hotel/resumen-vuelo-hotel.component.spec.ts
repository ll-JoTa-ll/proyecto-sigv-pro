import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenVueloHotelComponent } from './resumen-vuelo-hotel.component';

describe('ResumenVueloHotelComponent', () => {
  let component: ResumenVueloHotelComponent;
  let fixture: ComponentFixture<ResumenVueloHotelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenVueloHotelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenVueloHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
