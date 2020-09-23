import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendacionHotelComponent } from './recomendacion-hotel.component';

describe('RecomendacionHotelComponent', () => {
  let component: RecomendacionHotelComponent;
  let fixture: ComponentFixture<RecomendacionHotelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecomendacionHotelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomendacionHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
