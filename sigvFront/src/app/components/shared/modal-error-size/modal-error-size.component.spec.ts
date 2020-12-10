import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalErrorSizeComponent } from './modal-error-size.component';

describe('ModalErrorSizeComponent', () => {
  let component: ModalErrorSizeComponent;
  let fixture: ComponentFixture<ModalErrorSizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalErrorSizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalErrorSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
