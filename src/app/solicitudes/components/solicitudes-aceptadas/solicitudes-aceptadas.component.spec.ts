import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesAceptadasComponent } from './solicitudes-aceptadas.component';

describe('SolicitudesAceptadasComponent', () => {
  let component: SolicitudesAceptadasComponent;
  let fixture: ComponentFixture<SolicitudesAceptadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudesAceptadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesAceptadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
