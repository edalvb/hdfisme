import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoPrioridadComponent } from './mantenimiento-prioridad.component';

describe('MantenimientoPrioridadComponent', () => {
  let component: MantenimientoPrioridadComponent;
  let fixture: ComponentFixture<MantenimientoPrioridadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientoPrioridadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoPrioridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
