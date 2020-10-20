import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoTareaComponent } from './mantenimiento-tarea.component';

describe('MantenimientoTareaComponent', () => {
  let component: MantenimientoTareaComponent;
  let fixture: ComponentFixture<MantenimientoTareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientoTareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
