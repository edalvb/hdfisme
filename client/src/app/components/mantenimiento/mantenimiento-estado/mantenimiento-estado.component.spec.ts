import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoEstadoComponent } from './mantenimiento-estado.component';

describe('MantenimientoEstadoComponent', () => {
  let component: MantenimientoEstadoComponent;
  let fixture: ComponentFixture<MantenimientoEstadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientoEstadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
