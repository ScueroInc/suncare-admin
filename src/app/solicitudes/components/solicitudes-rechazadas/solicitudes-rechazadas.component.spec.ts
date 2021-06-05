import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesRechazadasComponent } from './solicitudes-rechazadas.component';

describe('SolicitudesRechazadasComponent', () => {
  let component: SolicitudesRechazadasComponent;
  let fixture: ComponentFixture<SolicitudesRechazadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudesRechazadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesRechazadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
