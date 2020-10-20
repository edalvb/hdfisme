import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoTipoComponent } from './mantenimiento-tipo.component';

describe('MantenimientoTipoComponent', () => {
  let component: MantenimientoTipoComponent;
  let fixture: ComponentFixture<MantenimientoTipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientoTipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
