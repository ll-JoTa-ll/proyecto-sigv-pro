import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSesionExpiradaComponent } from './modal-sesion-expirada.component';

describe('ModalSesionExpiradaComponent', () => {
  let component: ModalSesionExpiradaComponent;
  let fixture: ComponentFixture<ModalSesionExpiradaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSesionExpiradaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSesionExpiradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
