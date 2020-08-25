import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendacionHotelDetailComponent } from './recomendacion-hotel-detail.component';

describe('RecomendacionHotelDetailComponent', () => {
  let component: RecomendacionHotelDetailComponent;
  let fixture: ComponentFixture<RecomendacionHotelDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecomendacionHotelDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomendacionHotelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
