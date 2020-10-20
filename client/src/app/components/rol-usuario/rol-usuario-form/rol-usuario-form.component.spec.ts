import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolUsuarioFormComponent } from './rol-usuario-form.component';

describe('RolUsuarioFormComponent', () => {
  let component: RolUsuarioFormComponent;
  let fixture: ComponentFixture<RolUsuarioFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolUsuarioFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolUsuarioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
