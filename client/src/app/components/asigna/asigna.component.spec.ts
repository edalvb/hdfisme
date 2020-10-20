import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaComponent } from './asigna.component';

describe('AsignaComponent', () => {
  let component: AsignaComponent;
  let fixture: ComponentFixture<AsignaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
