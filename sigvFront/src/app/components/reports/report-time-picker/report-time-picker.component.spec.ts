import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTimePickerComponent } from './report-time-picker.component';

describe('ReportTimePickerComponent', () => {
  let component: ReportTimePickerComponent;
  let fixture: ComponentFixture<ReportTimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTimePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
