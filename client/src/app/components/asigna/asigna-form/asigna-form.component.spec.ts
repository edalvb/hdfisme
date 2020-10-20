import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaFormComponent } from './asigna-form.component';

describe('AsignaFormComponent', () => {
  let component: AsignaFormComponent;
  let fixture: ComponentFixture<AsignaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
