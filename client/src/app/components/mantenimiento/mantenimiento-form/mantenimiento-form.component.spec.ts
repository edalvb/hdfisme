import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoFormComponent } from './mantenimiento-form.component';

describe('MantenimientoFormComponent', () => {
  let component: MantenimientoFormComponent;
  let fixture: ComponentFixture<MantenimientoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
