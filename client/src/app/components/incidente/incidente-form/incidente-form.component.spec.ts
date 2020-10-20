import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenteFormComponent } from './incidente-form.component';

describe('IncidenteFormComponent', () => {
  let component: IncidenteFormComponent;
  let fixture: ComponentFixture<IncidenteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidenteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidenteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
